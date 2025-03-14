package openlibrary

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/enkelm/scylladb-interview/internal/logger"
)

const base_url = "https://openlibrary.org%s.json"

var (
	bookCache  = make(map[string]ISBNResponse)
	workCache  = make(map[string]WorkResponse)
	httpClient = &http.Client{Timeout: 10 * time.Second}
)

func GetBook(isbn string) (ISBNResponse, error) {
	log := logger.Get()
	endpoint := fmt.Sprintf(base_url, fmt.Sprintf("/isbn/%s", isbn))

	if item, ok := bookCache[endpoint]; ok {
		log.Debug("Returning cached Open Library book results for ISBN: %s", isbn)
		return item, nil
	}

	log.Info("Fetching book from Open Library API for ISBN: %s", isbn)

	start := time.Now()
	res, err := httpClient.Get(endpoint)
	elapsed := time.Since(start)

	if err != nil {
		log.Error("HTTP request failed: %v", err)
		bookCache[endpoint] = ISBNResponse{}
		return bookCache[endpoint], err
	}
	defer res.Body.Close()

	log.Debug("Open Library API response received in %s with status %s", elapsed, res.Status)

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		// For Open Library, just return the status code as errors come back as HTML
		errMsg := fmt.Sprintf("Open Library API Error: %s", res.Status)
		log.Error(errMsg)
		bookCache[endpoint] = ISBNResponse{}
		return bookCache[endpoint], errors.New(errMsg)
	}

	var book ISBNResponse
	if err := json.NewDecoder(res.Body).Decode(&book); err != nil {
		log.Error("Failed to decode API response: %v", err)
		bookCache[endpoint] = ISBNResponse{}
		return bookCache[endpoint], err
	}

	log.Info("Successfully retrieved book details from Open Library API for ISBN: %s", isbn)

	bookCache[endpoint] = book
	return book, nil
}

func GetWorks(workKey string) (WorkResponse, error) {
	log := logger.Get()
	endpoint := fmt.Sprintf(base_url, workKey)

	if item, ok := workCache[endpoint]; ok {
		log.Debug("Returning cached Open Library work results for key: %s", workKey)
		return item, nil
	}

	log.Info("Fetching work from Open Library API for key: %s", workKey)

	start := time.Now()
	res, err := httpClient.Get(endpoint)
	elapsed := time.Since(start)

	if err != nil {
		log.Error("HTTP request failed: %v", err)
		workCache[endpoint] = WorkResponse{}
		return workCache[endpoint], err
	}
	defer res.Body.Close()

	log.Debug("Open Library API response received in %s with status %s", elapsed, res.Status)

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		// For Open Library, just return the status code as errors come back as HTML
		errMsg := fmt.Sprintf("Open Library API Error: %s", res.Status)
		log.Error(errMsg)
		workCache[endpoint] = WorkResponse{}
		return workCache[endpoint], errors.New(errMsg)
	}

	var work WorkResponse
	if err := json.NewDecoder(res.Body).Decode(&work); err != nil {
		log.Error("Failed to decode API response: %v", err)
		workCache[endpoint] = WorkResponse{}
		return workCache[endpoint], err
	}

	log.Info("Successfully retrieved work details from Open Library API for key: %s", workKey)

	workCache[endpoint] = work
	return work, nil
}
