package googlebooks

type VolumesResponse struct {
	TotalCount int            `json:"totalItems"`
	Items      []BookResponse `json:"items"`
}

type BookResponse struct {
	Id         string     `json:"id"`
	VolumeInfo volumeInfo `json:"volumeInfo"`
	SaleInfo   saleInfo   `json:"saleInfo"`
}

type volumeInfo struct {
	Title       string                `json:"title"`
	Authors     []string              `json:"authors"`
	Identifiers []industryIdentifiers `json:"industryIdentifiers"`
	ImageLinks  imageLinks            `json:"imageLinks"`
	Description string                `json:"description"`
	PageCount   int                   `json:"pageCount"`
}

type imageLinks struct {
	SmallThumbnail string `json:"smallThumbnail"`
	Thumbnail      string `json:"thumbnail"`
}

type industryIdentifiers struct {
	Type ISBNType `json:"type"`
	Id   string   `json:"identifier"`
}

type saleInfo struct {
	Saleability SaleabilityStatus `json:"saleability"`
	ListPrice   price             `json:"listPrice"`
	RetailPrice price             `json:"retailPrice"`
}

type price struct {
	Amount       float64 `json:"amount"`
	CurrencyCode string  `json:"currencyCode"`
}
