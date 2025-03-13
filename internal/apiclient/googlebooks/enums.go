package googlebooks

type SaleabilityStatus string

const (
	SS_FREE         SaleabilityStatus = "FREE"
	SS_FOR_SALE     SaleabilityStatus = "FOR_SALE"
	SS_NOT_FOR_SALE SaleabilityStatus = "NOT_FOR_SALE"
	SS_FOR_PREORDER SaleabilityStatus = "FOR_PREORDER"
)

type ISBNType string

const (
	ISBN_UNKNOWN ISBNType = "OTHER"
	ISBN10       ISBNType = "ISBN_10"
	ISBN13       ISBNType = "ISBN_13"
)
