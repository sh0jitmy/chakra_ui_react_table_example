package regdao

import "testing"
import "fmt"

func TestRegDao1(t *testing.T) {
	rdao := New()		
	err := rdao.Config("registerconf.yml")
	if err != nil {
		t.Error("config error")
	}
	regdata, perr := rdao.ProcRead()
	if perr != nil {
		t.Error("proc read error")
	}
	fmt.Printf("result: %v\n",regdata)
	t.Logf("result: %v",regdata)
}
