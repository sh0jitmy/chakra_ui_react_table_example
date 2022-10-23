package regdao

import (
	//"encoding/json"
	//"log"
	//"fmt"
	"os"
	"bufio"
	"regexp"
	"strings"
	yaml "gopkg.in/yaml.v2"
)


const regtype =  "0x"
const demreg = `0x|\|` 
//const demreg = `0x` 
const rname_index  = 0
const rvalue_index = 1
const reg_arr_num = 3 

type RegDAO struct {
	confpath string
	procpath string
	regmap  map[string] string
	regp *regexp.Regexp
}

func (rdao *RegDAO) ProcOpen(path string)(error) {
	_,err := os.Stat(path)
	if !os.IsNotExist(err) {
		rdao.procpath = path
	}
	return err
}

func (rdao *RegDAO) Config(confpath string)(error) {
	var m map[string] interface{}
	_,err := os.Stat(confpath)
	if os.IsNotExist(err) {
		return err
	}
	bytes,err := os.ReadFile(confpath)
	err = yaml.Unmarshal(bytes,&m)
	if err != nil {
		return err
	}
	err = rdao.ProcOpen(m["procpath"].(string))
	if err != nil {
		return err
	}

	/*
	regnamelist := m["register"]
	for _,v := range regnamelist {
		rdao.regmap[v] = "0x00000000"
	}
	*/
	rdao.confpath = confpath
	rdao.regp = regexp.MustCompile(demreg)
	return nil 
}

func (rdao *RegDAO) ProcRead()(map[string] string,error) {
	file,err := os.Open(rdao.procpath)
	if err != nil {
		return nil,err
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		rdao.getRegister(scanner.Text())
	}
	return rdao.regmap,scanner.Err()
}

func (rdao *RegDAO) getRegister(line string) {
	regline := strings.ReplaceAll(line, " ","")
	array := rdao.regp.Split(regline, -1)		
	if len(array) != reg_arr_num {
		return
	}
	rdao.regmap[array[rname_index]] = array[rvalue_index] 
}



func New()(*RegDAO) {
	m := make(map[string]string)
	return &RegDAO {
		confpath : "",
		procpath : "",
		regmap : m,
	}
}
