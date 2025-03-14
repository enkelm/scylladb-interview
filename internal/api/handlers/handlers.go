package handlers

import (
	"io/fs"
	"net/http"

	"github.com/enkelm/scylladb-interview/ui"
	"github.com/labstack/echo/v4"
)

// RegisterUIHandlers sets up all the UI/frontend related routes
func RegisterUIHandlers(e *echo.Echo) {
	// Set up static file server
	assetHandler := http.FileServer(http.FS(ui.DistDirFS))
	e.GET("/static/*", echo.WrapHandler(http.StripPrefix("/static", assetHandler)))

	// SPA handler - serve index.html for all unmatched routes
	e.GET("/*", serveUI(assetHandler))
}

// serveUI handles serving the UI files with SPA fallback to index.html
func serveUI(assetHandler http.Handler) echo.HandlerFunc {
	return func(c echo.Context) error {
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
	}
}

// ListFiles is a debug handler that lists all files in the UI distribution
func ListFiles(c echo.Context) error {
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
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, files)
}
