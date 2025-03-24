package app

type PagedBooks struct {
	TotalCount int    `json:"totalCount"`
	Items      []Book `json:"items"`
}

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
