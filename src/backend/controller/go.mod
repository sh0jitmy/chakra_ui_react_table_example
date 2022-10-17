module controller

go 1.17

replace local.com/protocols => ../protocols

replace local.com/repositry => ../repositry

require (
	github.com/go-co-op/gocron v1.17.0
	local.com/protocols v0.0.0-00010101000000-000000000000
	local.com/repositry v0.0.0-00010101000000-000000000000
)

require (
	github.com/robfig/cron/v3 v3.0.1 // indirect
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c // indirect
)
