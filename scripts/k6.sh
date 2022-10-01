#!/bin/sh

IMAGE_NAME="k6_template"
IMAGE="$(docker images "$IMAGE_NAME" -q)"

docker run -w /scripts/dist -v "$(pwd)":/scripts "$IMAGE" "$@"
