#!/bin/sh

. `dirname $0`/func.sh

sed -i "s/\"version\".*/\"version\": \"beta\",/" bower.json

build 'beta'