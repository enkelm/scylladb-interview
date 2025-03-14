package googlebooks

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/enkelm/scylladb-interview/internal/logger"
)

const base_url = "https://www.googleapis.com/books/v1/volumes?q=%s&maxAllowedMaturityRating=not-mature&startIndex=%d&maxResults=10"

var (
	cache      = make(map[string][]BookResponse)
	httpClient = &http.Client{Timeout: 10 * time.Second}
)

func GetBooks(query string, startIndex int) ([]BookResponse, error) {
	log := logger.Get()

	endpoint := fmt.Sprintf(base_url, query, startIndex)
	if items, ok := cache[endpoint]; ok {
		log.Debug("Returning cached Google Books results for query: %s", query)
		return items, nil
	}

	log.Info("Fetching books from Google Books API: %s (startIndex: %d)", query, startIndex)

	start := time.Now()
	res, err := httpClient.Get(endpoint)
	elapsed := time.Since(start)

	if err != nil {
		log.Error("HTTP request failed: %v", err)
		cache[endpoint] = nil
		return nil, err
	}
	defer res.Body.Close()

	log.Debug("Google Books API response received in %s with status %s", elapsed, res.Status)

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		log.Error("Google Books API error: %s", res.Status)

		var errResp ErrorResponse
		bodyBytes, err := io.ReadAll(res.Body)
		if err != nil {
			log.Error("Failed to read error response body: %v", err)
		} else {
			if jsonErr := json.Unmarshal(bodyBytes, &errResp); jsonErr != nil {
				log.Error("Failed to parse error response: %v", jsonErr)
				log.Error("Raw error response: %s", string(bodyBytes))
			} else {
				log.Error(errResp.Error())
			}
		}

		cache[endpoint] = nil
		return nil, &errResp
	}

	var resp VolumesResponse
	if err := json.NewDecoder(res.Body).Decode(&resp); err != nil {
		log.Error("Failed to decode API response: %v", err)
		cache[endpoint] = nil
		return nil, err
	}

	log.Info("Successfully retrieved %d books from Google Books API for query: %s",
		len(resp.Items), query)

	cache[endpoint] = resp.Items
	return resp.Items, nil
}
