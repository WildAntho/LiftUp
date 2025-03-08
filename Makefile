BUILD =  docker compose -f compose.yaml --env-file .env.dev up -d
CLEAN = docker system prune -af --volumes   
STOP = docker stop database gateway visualizer frontend backend file
STOPFRONTEND = docker stop frontend
STOPBACKEND = docker stop backend
STOPDATABASE = docker stop database
STOPVISUALIZER = docker stop visualizer
STOPGATEWAY = docker stop gateway
STOPFILE = docker stop file

build:
	$(BUILD)

clean:
	$(CLEAN)

stop:
	$(STOP)

stop_frontend:
	$(STOPFRONTEND)

stop_backend:
	$(STOPBACKEND)

stop_database:
	$(STOPDATABASE)

stop_visualizer:
	$(STOPVISUALIZER)

stop_gateway:
	$(STOPGATEWAY)

stop_file:
	$(STOPFILE)