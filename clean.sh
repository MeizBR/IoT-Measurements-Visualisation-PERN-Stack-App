#!/bin/bash

docker-compose down
docker rmi iot-measurements-visualisation-pern-stack-app_iotmvfrontend iot-measurements-visualisation-pern-stack-app_iotmvbackend
docker-compose ps
docker ps
docker images
