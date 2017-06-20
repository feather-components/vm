#!/bin/sh

. `dirname $0`/func.sh

cat package.json > bower.json
sed -i "s/\"version\".*/\"version\": \"beta\",/" bower.json

build 'beta'