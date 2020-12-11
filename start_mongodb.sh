#!/bin/sh

sudo docker run --name mongodb -p 27017:27017 -v ~/mongo/data:/data/db mongo