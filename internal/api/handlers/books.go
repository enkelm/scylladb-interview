package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/enkelm/scylladb-interview/internal/app"
	"github.com/enkelm/scylladb-interview/internal/logger"
	"github.com/labstack/echo/v4"
)

func GetBooks(c echo.Context) error {
	log := logger.Get()

	query := c.QueryParam("q")
	if query == "" {
		query = "nosql" // Default query
		log.Debug("Using default query: %s", query)
	} else {
		log.Debug("Processing book query: %s", query)
	}

	pageParam := c.QueryParam("page")
	page, err := strconv.Atoi(pageParam)
	if err != nil {
		page = 0 // Default page
		log.Debug("Using default page: %d", page)
	}

	resp, err := app.GetFreeBooks(query, page)
	if err != nil {
		log.Error("Failed to get books for query '%s': %v", query, err)
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Error: %v", err))
	}

	log.Info("Retrieved %d books for query: %s", len(resp.Items), query)
	return c.JSON(http.StatusOK, resp)
}
