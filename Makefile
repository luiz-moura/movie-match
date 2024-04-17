default: env composer-install up npm-install key-generate
	@echo "Your environment is ready to use! Access http://laravel.test and enjoy it!"

SAIL_PATH=@./vendor/bin/sail

.PHONY: up
up:
	@echo "Starting all docker containers"
	$(SAIL_PATH) up --force-recreate -d
	$(SAIL_PATH) art storage:link

.PHONY: down
down:
	@echo "Stopping all docker containers"
	$(SAIL_PATH) down

.PHONY: restart
restart: down up

.PHONY: env
env:
	@echo "Copying .env.example to .env file"
	@cp .env.example .env

.PHONY: npm-install
npm-install:
	@echo "Installing npm dependencies"
	$(SAIL_PATH) npm install

.PHONY: composer-install
composer-install:
	@echo "Installing composer dependencies"
	@sh ./bin/prepare.sh

.PHONY: key-generate
key-generate:
	@echo "Generating new laravel key"
	$(SAIL_PATH) art key:generate

.PHONY: reverb
reverb:
	@echo "Starting reverb"
	$(SAIL_PATH) artisan reverb:start

.PHONY: queue
queue:
	@echo "Starting queue"
	$(SAIL_PATH) artisan queue:work
