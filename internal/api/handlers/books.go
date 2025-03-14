package handlers

import (
	"fmt"
	"net/http"

	"github.com/enkelm/scylladb-interview/internal/app"
	"github.com/labstack/echo/v4"
)

// GetBooks handles the request to get books based on a query parameter
func GetBooks(c echo.Context) error {
	query := c.QueryParam("q")
	if query == "" {
		query = "nosql" // Default query
	}

	books, err := app.GetFreeBooks(query)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Error: %v", err))
	}

	return c.JSON(http.StatusOK, books)
}
