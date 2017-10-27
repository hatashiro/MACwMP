#!/usr/bin/env bash

mkdir -p dist

babel $1 -o "dist/$(basename $1 .macro.js).babel.js"
