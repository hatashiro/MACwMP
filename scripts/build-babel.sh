#!/usr/bin/env bash

# PLEASE RUN THIS SCRIPT FROM THE PROJECT ROOT

mkdir -p dist

result="dist/$(basename $1 .macro.js).babel.js"

# build async/await into promise chaning
babel $1 -o $result

# to workaround async-to-promises bug, remove empty callback
sed -i.bak 's/\.then( *function *( *) *{ *} *)//' $result
