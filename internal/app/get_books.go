package app

import (
	"math"
	"math/rand/v2"
	"strconv"
	"sync"

	"github.com/enkelm/scylladb-interview/internal/apiclient/googlebooks"
	"github.com/enkelm/scylladb-interview/internal/apiclient/openlibrary"
	"github.com/enkelm/scylladb-interview/internal/logger"
)

var cache = make(map[string]PagedBooks)

func GetFreeBooks(query string, page int) (PagedBooks, error) {
	log := logger.Get()

	if resp, ok := cache[query+strconv.Itoa(page)]; ok {
		log.Debug("Returning %d cached books for query: %s", len(resp.Items), query)
		return resp, nil
	}

	log.Info("Fetching books from Google Books API for query: %s", query)
	var response PagedBooks

	googleBooks, err := googlebooks.GetBooks(query, page*10)
	if err != nil {
		log.Error("Failed to fetch books from Google Books API: %v", err)
		cache[query+strconv.Itoa(page)] = response
		return response, err
	}
	response.TotalCount = googleBooks.TotalCount

	log.Debug("Processing %d Google Books results for query: %s", len(googleBooks.Items), query)

	bookCount := len(googleBooks.Items)
	booksChan := make(chan Book, bookCount)
	var wg sync.WaitGroup

	for _, gBook := range googleBooks.Items {
		wg.Add(1)
		go func(gBook googlebooks.BookResponse) {
			defer wg.Done()
			book := processGoogleBook(gBook, log)
			booksChan <- book
		}(gBook)
	}

	go func() {
		wg.Wait()
		close(booksChan)
	}()

	response.Items = make([]Book, 0, bookCount)
	for book := range booksChan {
		response.Items = append(response.Items, book)
	}

	log.Info("Caching %d books for query: %s", len(response.Items), query)
	cache[query] = response
	return response, nil
}

func processGoogleBook(gBook googlebooks.BookResponse, log *logger.Logger) Book {
	book := Book{
		Id:          gBook.Id,
		Image:       gBook.VolumeInfo.ImageLinks.Thumbnail,
		Title:       gBook.VolumeInfo.Title,
		Author:      "Unknown",
		Description: gBook.VolumeInfo.Description,
		PageCount:   gBook.VolumeInfo.PageCount,
		Price:       math.Max(4.99, float64(math.Floor(rand.Float64()*100)/100)+float64(rand.IntN(61))),
	}

	if len(gBook.VolumeInfo.Authors) > 0 {
		book.Author = gBook.VolumeInfo.Authors[0]
	}

	for _, identifier := range gBook.VolumeInfo.Identifiers {
		if identifier.Id == "" || identifier.Type == googlebooks.ISBN_UNKNOWN {
			continue
		}

		log.Debug("Fetching details from OpenLibrary for ISBN: %s", identifier.Id)
		openLibBook, err := openlibrary.GetBook(identifier.Id)
		if err != nil {
			log.Debug("Failed to fetch OpenLibrary data for ISBN %s: %v", identifier.Id, err)
			continue
		}

		if openLibBook.LatestRevision > 1 && len(openLibBook.Works) > 0 {
			workKey := openLibBook.Works[0].Key
			log.Debug("Fetching work details for: %s", workKey)

			work, err := openlibrary.GetWorks(workKey)
			if err != nil {
				log.Debug("Failed to fetch work details: %v", err)
				continue
			}

			if work.Description != "" {
				log.Debug("Using OpenLibrary description for book: %s", gBook.Id)
				book.Description = work.Description
			}
		}

		book.ISBN = identifier.Id
		break
	}

	return book
}

// abandoned for simplicity
// recursively fetch paid books to find paid books by batches of 10
func GetPaidBooks() ([]googlebooks.BookResponse, error) {
	return getPaidBatch([]googlebooks.BookResponse{}, 0)
}

func getPaidBatch(books []googlebooks.BookResponse, startIndex int) ([]googlebooks.BookResponse, error) {
	if len(books) == 10 {
		return books, nil
	}

	nextBooks, err := googlebooks.GetBooks("rich", startIndex)
	if err != nil {
		return nil, err
	}

	for _, book := range nextBooks.Items {
		if len(books) < 10 {
			books = append(books, book)
		}
	}

	startIndex += 10

	getPaidBatch(books, startIndex)
	return books, nil
}
