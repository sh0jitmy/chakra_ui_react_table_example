package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
        "github.com/gin-contrib/cors"
        "local.com/controller"
)

type httpCode struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}


func main() {
	// router init
	r := gin.Default()
	r.Use(cors.Default())

	radiocon := controller.New() 

	r.GET("/rmf", func(c *gin.Context) {
		result,err := radiocon.Get(c.FullPath())
		if err != nil {
			resCode(c, http.StatusOK, "internal error")
		} else {
			c.Data(http.StatusOK, "application/json",result)
		}
	})
	r.GET("/property", func(c *gin.Context) {
		result,err := radiocon.Get(c.FullPath())
		if err != nil {
			resCode(c, http.StatusOK, "internal error")
		} else {
			c.Data(http.StatusOK, "application/json",result)
			//c.Data(http.StatusOK, result)
		}
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}

func resCode(ctx *gin.Context, code int, data ...interface{}) {
	er := httpCode{
		Status:  code,
		Message: http.StatusText(code),
		Data:    data,
	}
	ctx.JSON(http.StatusOK, er)
}
