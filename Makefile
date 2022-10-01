.DEFAULT_GOAL := help
PWD = $(shell realpath $(dir $(lastword $(MAKEFILE_LIST))))
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
IMAGE_NAME := k6_template
IMAGE := $(shell docker images $(IMAGE_NAME) -q)
CONTAINER = $(shell docker ps --filter "ancestor=$(IMAGE)" -q)

build: ## build k6 image
	@docker build -t $(IMAGE_NAME) . --file Dockerfile

build-no-cache: ## build k6 image --no-cache
	@docker build -t $(IMAGE_NAME) --no-cache . --file Dockerfile

ls: ## ls k6 scripts
	@docker run -w /scripts/dist -v $(PWD):/scripts/ --entrypoint "find" $(IMAGE) . | grep .*.js$

tail: ## tail /dev/null and keep run container
	@docker run -w /scripts/dist -v $(PWD):/scripts/ --entrypoint "tail" $(IMAGE) -f /dev/null

stop: ## stop runing container
	@docker stop $(CONTAINER)

kill: ## kill runing container
	@docker kill $(CONTAINER)

exec: ## exec into container /bin/sh
	@docker exec -it $(CONTAINER) /bin/sh

help: ## show help for make
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
