#!/usr/bin/env bash

mkdir -p dist

result="dist/$(basename $1 .babel.js).js"

cat src/run-monad.js > $result
cat src/comp-array.js >> $result
cat $1 >> $result
