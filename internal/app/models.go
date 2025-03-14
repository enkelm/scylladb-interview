package app

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
