package api

import (
	"github.com/enkelm/scylladb-interview/internal/api/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func InitRoutes(e *echo.Echo) {
	e.Use(middleware.Logger())

	handlers.RegisterUIHandlers(e)

	apiGroup := e.Group("/api")
	apiGroup.GET("/debug/files", handlers.ListFiles)
	apiGroup.GET("", handlers.GetBooks)
}
