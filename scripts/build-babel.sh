#!/usr/bin/env bash

mkdir -p dist

result="dist/$(basename $1 .macro.js).babel.js"

babel $1 -o $result

# to workaround async-to-promises bug, remove empty callback
sed -i.bak 's/\.then( *function *( *) *{ *} *)//' $result
