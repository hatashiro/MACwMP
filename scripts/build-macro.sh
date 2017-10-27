#!/usr/bin/env bash

# PLEASE RUN THIS SCRIPT FROM THE PROJECT ROOT

mkdir -p dist

# build macros with Sweet.js
sjs --no-babel $1 > "dist/$(basename $1 .js).macro.js"
