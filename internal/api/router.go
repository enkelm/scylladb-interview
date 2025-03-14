package api

import (
	"github.com/enkelm/scylladb-interview/internal/api/handlers"
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo) {
	handlers.RegisterUIHandlers(e)

	apiGroup := e.Group("/api")

	apiGroup.GET("/debug/files", handlers.ListFiles)

	apiGroup.GET("", handlers.GetBooks)
}
