#!/usr/bin/env bash

# PLEASE RUN THIS SCRIPT FROM THE PROJECT ROOT

mkdir -p dist

result="dist/$(basename $1 .babel.js).js"

# concat monad stuff to the built result
cat src/run-monad.js > $result
cat src/comp-array.js >> $result
cat $1 >> $result
