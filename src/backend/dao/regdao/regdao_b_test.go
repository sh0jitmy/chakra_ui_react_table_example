package regdao

import "testing"


func BenchmarkRegDao(b *testing.B) {
	rdao := New()		
	rdao.Config("registerconf.yml")
	b.ResetTimer()
	for i :=0; i < b.N; i++ {
		rdao.ProcRead()
	}
}
