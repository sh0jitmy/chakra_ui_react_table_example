package repositry

import (
	"encoding/json"
	"time"
	"github.com/patrickmn/go-cache"
	"local.com/protocols"
)

type RadioRepositry struct {
	cache *cache.Cache
}


func New()(*RadioRepositry) {
	pc := cache.New(cache.NoExpiration,cache.NoExpiration)
	props := []protocols.Property {
		{
			ID : "Test1",
			Value : "TestValue1",
			Updateat : "2022/08/13 00:00:00",
		},
		{
			ID : "Test2",
			Value: "TestValue2",
			Updateat : "2022/08/13 00:00:00",
		},
	}
	pc.Set("property",props,cache.NoExpiration)	
	return &RadioRepositry {
		cache: pc,	
	}
}

func (repos *RadioRepositry) Update(data []byte) (error){
	var props []protocols.Property	
	if err := json.Unmarshal(data,&props); err != nil {
		return err
        }
	for _,v := range props {
		//props[pindex].ID = path + string(pindex+1) 
		v.Updateat = time.Now().Format("2006-01-02 15:04:05") 
	}
	repos.cache.Set("property",props,cache.NoExpiration)	
	return nil
}

func (repos *RadioRepositry) Get(path string) (interface{}) {
	data , _ := repos.cache.Get(path)
	return data	
}
