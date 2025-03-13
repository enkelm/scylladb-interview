package app

import (
	"fmt"
	"math"
	"math/rand/v2"

	"github.com/enkelm/scylladb-interview/internal/apiclient/googlebooks"
	"github.com/enkelm/scylladb-interview/internal/apiclient/openlibrary"
)

type Book struct {
	Id          string  `json:"id"`
	ISBN        string  `json:"isbn"`
	Image       string  `json:"image"`
	Title       string  `json:"title"`
	Author      string  `json:"author"`
	Description string  `json:"description"`
	PageCount   int     `json:"pageCount"`
	Price       float64 `json:"price"`
}

func GetFreeBooks(query string) ([]Book, error) {
	books := []Book{}

	googleBooks, err := googlebooks.GetBooks(query, 0)
	if err != nil {
		return nil, err
	}

	for _, gBook := range googleBooks {
		fmt.Printf("%+v\n", gBook)
		book := Book{
			Id:          gBook.Id,
			Image:       gBook.VolumeInfo.ImageLinks.Thumbnail,
			Title:       gBook.VolumeInfo.Title,
			Author:      "Unkown",
			Description: gBook.VolumeInfo.Description,
			PageCount:   gBook.VolumeInfo.PageCount,
			Price:       math.Max(4.99, float64(math.Floor(rand.Float64()*100)/100)+float64(rand.IntN(61))),
		}

		if len(gBook.VolumeInfo.Authors) > 0 {
			book.Author = gBook.VolumeInfo.Authors[0]
		}

		for _, identifier := range gBook.VolumeInfo.Identifiers {
			fmt.Printf("\n\n\n")
			if identifier.Id == "" || identifier.Type == googlebooks.ISBN_UNKNOWN {
				continue
			}
			openLibBook, err := openlibrary.GetBook(identifier.Id)
			if err != nil {
				continue
			}
			fmt.Println("### OPEN LIB ##")
			fmt.Printf("%+v\n", openLibBook)
			fmt.Println("### OPEN LIB ##")
			if openLibBook.LatestRevision > 1 {
				work, err := openlibrary.GetWorks(openLibBook.Works[0].Key)
				if err != nil {
					continue
				}
				fmt.Println("### OPEN LIB WORK ##")
				fmt.Printf("%+v\n", work)
				fmt.Println("### OPEN LIB WORK ##")
				if work.Description != "" {
					book.Description = work.Description
				}
			}
			book.ISBN = identifier.Id
			break
		}
		books = append(books, book)
	}

	return books, nil
}

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

	for _, book := range nextBooks {
		if len(books) < 10 {
			books = append(books, book)
		}
	}

	startIndex += 10
	fmt.Printf("%+v\n", books)
	fmt.Printf("%d\n", startIndex)

	getPaidBatch(books, startIndex)
	return books, nil
}
