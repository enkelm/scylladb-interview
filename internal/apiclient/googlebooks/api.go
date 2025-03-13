package googlebooks

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
)

const base_url = "https://www.googleapis.com/books/v1/volumes?q=%s&maxAllowedMaturityRating=not-mature&startIndex=%d&maxResults=10"

var cache = make(map[string][]BookResponse)

func GetBooks(query string, startIndex int) ([]BookResponse, error) {
	endpoint := fmt.Sprintf(base_url, query, startIndex)
	if items, ok := cache[endpoint]; ok {
		return items, nil
	}

	res, err := http.Get(endpoint)
	if err != nil {
		cache[endpoint] = nil
		return nil, err
	}
	defer res.Body.Close()

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		fmt.Println(res.Status)
		bodyBytes, err := io.ReadAll(res.Body)
		if err != nil {
			cache[endpoint] = nil
			return nil, err
		}

		fmt.Println("Raw JSON Response:")
		fmt.Println(string(bodyBytes))
		return nil, errors.New("http err")
	}

	var resp VolumesResponse
	if err := json.NewDecoder(res.Body).Decode(&resp); err != nil {
		cache[endpoint] = nil
		return nil, err
	}

	cache[endpoint] = resp.Items
	return resp.Items, nil
}
