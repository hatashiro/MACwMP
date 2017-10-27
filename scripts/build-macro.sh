#!/usr/bin/env bash

mkdir -p dist

sjs --no-babel $1 > "dist/$(basename $1 .js).macro.js"
