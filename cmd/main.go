package main

import (
	"github.com/enkelm/scylladb-interview/internal/api"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	api.InitRoutes(e)
	e.Logger.Fatal(e.Start(":6000"))
}
