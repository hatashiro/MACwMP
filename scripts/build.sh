#!/usr/bin/env bash

# PLEASE RUN THIS SCRIPT FROM THE PROJECT ROOT

macro_result="dist/$(basename $1 .js).macro.js"
babel_result="dist/$(basename $1 .js).babel.js"

./scripts/build-macro.sh $1
./scripts/build-babel.sh $macro_result
./scripts/build-monad.sh $babel_result
