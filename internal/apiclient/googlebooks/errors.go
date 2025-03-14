package googlebooks

import (
	"fmt"
	"strings"
)

type ErrorResponse struct {
	ApiError errorDto `json:"error"`
}

func (e ErrorResponse) Error() string {
	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("Google Books API Error (Code: %d): %s", e.ApiError.Code, e.ApiError.Message))

	if len(e.ApiError.Errors) > 0 {
		sb.WriteString("\nDetails:")
		for i, err := range e.ApiError.Errors {
			sb.WriteString(fmt.Sprintf("\n  %d. [%s/%s] %s",
				i+1, err.Domain, err.Reason, err.Message))
		}
	}

	return sb.String()
}

type errorDto struct {
	Code    int            `json:"code"`
	Message string         `json:"message"`
	Errors  []errorMessage `json:"errors"`
}

type errorMessage struct {
	Message string `json:"message"`
	Domain  string `json:"domain"`
	Reason  string `json:"reason"`
}
