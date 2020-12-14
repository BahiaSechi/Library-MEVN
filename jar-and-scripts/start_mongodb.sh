#!/bin/sh
FIXTURE_PATH=$(pwd)/fixtures/data
CONTAINER_NAME="mongodb"
sudo docker container stop $CONTAINER_NAME
sudo docker container rm $CONTAINER_NAME
sudo docker run --name $CONTAINER_NAME -p 27017:27017 -v $FIXTURE_PATH:/data/db mongo