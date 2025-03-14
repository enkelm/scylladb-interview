package main

import (
	"github.com/enkelm/scylladb-interview/internal/api"
	"github.com/enkelm/scylladb-interview/internal/logger"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.Logger.SetLevel(2)
	logger.SetLogger(e)
	api.InitRoutes(e)
	e.Logger.Fatal(e.Start(":6000"))
}
