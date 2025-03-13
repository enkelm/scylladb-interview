package main

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/enkelm/scylladb-interview/internal/app"
	"github.com/enkelm/scylladb-interview/ui"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	assetHandler := http.FileServer(http.FS(ui.DistDirFS))
	e.GET("/static/*", echo.WrapHandler(http.StripPrefix("/static", assetHandler)))

	e.GET("/*", func(c echo.Context) error {
		path := c.Request().URL.Path

		file, err := ui.DistDirFS.Open(path[1:]) // Remove leading slash
		if err == nil {
			file.Close()
			return echo.WrapHandler(assetHandler)(c)
		}

		indexFile, err := fs.ReadFile(ui.DistDirFS, "index.html")
		if err != nil {
			return c.String(http.StatusInternalServerError, "Could not read index.html")
		}

		return c.HTMLBlob(http.StatusOK, indexFile)
	})

	e.GET("/api/debug/files", func(c echo.Context) error {
		var files []string
		err := fs.WalkDir(ui.DistDirFS, ".", func(p string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if !d.IsDir() {
				files = append(files, p)
			}
			return nil
		})
		if err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprintf("Error: %v", err))
		}
		return c.JSON(http.StatusOK, files)
	})

	e.GET("/api", func(c echo.Context) error {
		books, err := app.GetFreeBooks("nosql")
		if err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprintf("Error: %v", err))
		}
		return c.JSON(http.StatusOK, books)
	})
	e.GET("/api", func(c echo.Context) error {
		q := c.QueryParam("q")
		books, err := app.GetFreeBooks(q)
		if err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprintf("Error: %v", err))
		}
		return c.JSON(http.StatusOK, books)
	})
	e.Logger.Fatal(e.Start(":6000"))
}
