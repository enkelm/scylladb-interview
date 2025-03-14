package logger

import (
	"github.com/labstack/echo/v4"
)

type Logger struct {
	echoLogger echo.Logger
}

func New(e *echo.Echo) *Logger {
	return &Logger{
		echoLogger: e.Logger,
	}
}

func (l *Logger) Info(format string, args ...interface{}) {
	l.echoLogger.Infof(format, args...)
}

func (l *Logger) Error(format string, args ...interface{}) {
	l.echoLogger.Errorf(format, args...)
}

func (l *Logger) Debug(format string, args ...interface{}) {
	l.echoLogger.Debugf(format, args...)
}

func (l *Logger) Warn(format string, args ...interface{}) {
	l.echoLogger.Warnf(format, args...)
}

var log *Logger

func SetLogger(e *echo.Echo) {
	log = New(e)
}

func Get() *Logger {
	return log
}
