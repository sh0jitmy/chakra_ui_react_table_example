package controller

import (
	"encoding/json"
	"log"
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	repos "local.com/repositry"
	"local.com/dao/regdao"
)

const SCHED_POLL_INTERVAL = 1000


type RadioController struct {
	sched *gocron.Scheduler
	repos *repos.RadioRepositry
	rdao  *regdao.RegDAO
}

func (radiocon *RadioController) Start() {
	radiocon.rdao.Config("config/registerconf.yml")
	radiocon.sched.Every(SCHED_POLL_INTERVAL).Milliseconds().Do(radiocon.ObserveSchedule)
	radiocon.sched.StartAsync()

}

func (radiocon *RadioController) ObserveSchedule() {
	//fmt.Println("sched call")
	data ,err := radiocon.rdao.ProcRead()
	if err == nil {
		radiocon.repos.Update("statusreg",data)
	}
}


func (radiocon *RadioController) Get (path string) ([]byte,error){
	props := radiocon.repos.Get(path)
	fmt.Println(path)
	fmt.Println(props)
        data,err := json.Marshal(props)
	if err != nil {
		log.Fatal(err)
	}
	return data,err
}

func (radiocon *RadioController) Put (path string, data []byte) ([]byte,error){
	props := radiocon.repos.Get(path)
        data,err := json.Marshal(props)
	if err != nil {
		log.Fatal(err)
	}
	return data,err
}

func New()(*RadioController) {
	repos := repos.New()
	sched := gocron.NewScheduler(time.Local)
	rdao := regdao.New()
	return &RadioController {
		repos : repos,
		sched : sched,	
		rdao :  rdao,	
	}
}
