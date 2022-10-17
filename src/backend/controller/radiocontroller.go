package controller

import (
	//"bytes"
	"encoding/json"
	//"io"
	"log"
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	repos "local.com/repositry"
	//"local.com/protocols"
)

const SCHED_POLL_INTERVAL = 1000


type RadioController struct {
	sched *gocron.Scheduler
	repos *repos.RadioRepositry
}

func (radiocon *RadioController) Start() {
	radiocon.sched.Every(SCHED_POLL_INTERVAL).Milliseconds().Do(radiocon.ObserveSchedule)
	radiocon.sched.StartAsync()

}

func (radiocon *RadioController) ObserveSchedule() {
	fmt.Println("sched call")	
}


func (radiocon *RadioController) Get (path string) ([]byte,error){
	props := radiocon.repos.Get(path)
	/*props := protocols.Property{
		ID : "Test1",
		Value : "TestValue1",
	}
	*/
        data,err := json.Marshal(props)
	if err != nil {
		log.Fatal(err)
	}
	return data,err
}

func New()(*RadioController) {
	repos := repos.New()
	sched := gocron.NewScheduler(time.Local)
	return &RadioController {
		repos : repos,
		sched : sched,	
	}
}
