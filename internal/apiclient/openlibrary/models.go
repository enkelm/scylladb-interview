package openlibrary

type Book struct {
	Title       string
	Author      string
	Description string
}

type ISBNResponse struct {
	Title          string       `json:"title"`
	Works          []keyedEntry `json:"works"`
	Revision       int          `json:"revision"`
	LatestRevision int          `json:"latest_revision"`
}

type WorkResponse struct {
	Description string `json:"description"`
}

type keyedEntry struct {
	Key string `json:"key"`
}
