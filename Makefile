BUILD =  docker compose -f compose.yaml --env-file .env.dev up -d
TEST = docker compose -f compose.e2e.yaml --env-file .env.test up -d
STAGING =  docker compose -f compose.staging.yaml --env-file .env.staging up -d
CLEAN = docker system prune -af --volumes   
STOP = docker stop $(shell docker ps -a -q)
STOPFRONTEND = docker stop liftup-dev-frontend
STOPBACKEND = docker stop liftup-dev-backend
STOPDATABASE = docker stop liftup-dev-database
STOPVISUALIZER = docker stop liftup-dev-visualizer
STOPGATEWAY = docker stop liftup-dev-gateway
STOPFILE = docker stop liftup-dev-file

build:
	$(BUILD)

test: 
	$(TEST)

staging:
	$(STAGING)

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