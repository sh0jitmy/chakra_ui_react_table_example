package main

import (
	"io/ioutil"
	"log"
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
	radiocon.Start() 
	
	r.PUT("/property", func(c *gin.Context) {
		buf, err := ioutil.ReadAll(c.Request.Body) 
		if err != nil {
			resCode(c, http.StatusBadRequest, "invalid request")
                }
                log.Println(string(buf))
                err = radiocon.Update(buf)
		if err != nil {
			resCode(c, http.StatusOK, "internal error")
		} else {
			resCode(c, http.StatusOK, "ok")
		}
	})
       	r.GET("/property", func(c *gin.Context) {
		result,err := radiocon.Get("property")
		log.Println(result)	
		if err != nil {
			resCode(c, http.StatusOK, "internal error")
		} else {
			c.Data(http.StatusOK, "application/json",result)
		}
	})

	r.Run(":58080") // listen and serve on 0.0.0.0:8080
}

func resCode(ctx *gin.Context, code int, data ...interface{}) {
	er := httpCode{
		Status:  code,
		Message: http.StatusText(code),
		Data:    data,
	}
	ctx.JSON(http.StatusOK, er)
}
