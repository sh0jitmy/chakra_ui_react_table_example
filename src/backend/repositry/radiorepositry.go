package repositry

import (
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
			Name : "TestName1",
			ID : "Test1",
			Value : "TestValue1",
			Updateat : "2022/08/13 00:00:00",
		},
		{
			Name : "TestName2",
			ID : "Test2",
			Value: "TestValue2",
			Updateat : "2022/08/13 00:00:00",
		},
	}
	pc.Set("props",props,cache.NoExpiration)	
	return &RadioRepositry {
		cache: pc,	
	}
}

func (repos *RadioRepositry) Get(path string) (interface{}) {
	data , _ := repos.cache.Get("props")
	return data	
}
