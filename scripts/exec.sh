#!/usr/bin/env bash

# PLEASE RUN THIS SCRIPT FROM THE PROJECT ROOT

# build
./scripts/build.sh $1

# exec
node "dist/$(basename $1 .js).js"
