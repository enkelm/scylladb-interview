package openlibrary

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

const base_url = "https://openlibrary.org%s.json"

var (
	bookCache = make(map[string]ISBNResponse)
	workCache = make(map[string]WorkResponse)
)

func GetBook(isbn string) (ISBNResponse, error) {
	endpoint := fmt.Sprintf(base_url, fmt.Sprintf("/isbn/%s", isbn))
	if item, ok := bookCache[endpoint]; ok {
		return item, nil
	}

	res, err := http.Get(endpoint)
	if err != nil {
		bookCache[endpoint] = ISBNResponse{}
		return bookCache[endpoint], err
	}
	defer res.Body.Close()

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		fmt.Println(res.Status)
		// bodyBytes, err := io.ReadAll(res.Body)
		// if err != nil {
		// 	return ISBNResponse{}, err
		// }

		// fmt.Println("Raw JSON Response:")
		// fmt.Println(string(bodyBytes))
		// return ISBNResponse{}, errors.New("http err")
	}

	var book ISBNResponse
	err = json.NewDecoder(res.Body).Decode(&book)
	if err != nil {
		bookCache[endpoint] = ISBNResponse{}
		return bookCache[endpoint], err
	}

	bookCache[endpoint] = book
	return book, nil
}

// works/OL45804W
func GetWorks(workKey string) (WorkResponse, error) {
	endpoint := fmt.Sprintf(base_url, workKey)
	if item, ok := workCache[endpoint]; ok {
		return item, nil
	}

	res, err := http.Get(endpoint)
	if err != nil {
		workCache[endpoint] = WorkResponse{}
		return workCache[endpoint], err
	}
	defer res.Body.Close()

	ok := strings.HasPrefix(res.Status, "2")
	if !ok {
		fmt.Println(res.Status)
		// bodyBytes, err := io.ReadAll(res.Body)
		// if err != nil {
		// 	return WorkResponse{}, err
		// }

		// fmt.Println("Raw JSON Response:")
		// fmt.Println(string(bodyBytes))
		// return WorkResponse{}, errors.New("http err")
	}

	var work WorkResponse
	err = json.NewDecoder(res.Body).Decode(&work)
	if err != nil {
		workCache[endpoint] = WorkResponse{}
		return workCache[endpoint], err
	}

	workCache[endpoint] = work
	return work, nil
}
