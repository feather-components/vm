#!/bin/sh

. `dirname $0`/func.sh

currentVersion=`grep '"version":' package.json | cut -d '"' -f 4`
arr=(${currentVersion//./ }) 
((arr[2]=arr[2]+1))
nextVersion="${arr[0]}.${arr[1]}.${arr[2]}"

if [[ $NODE_ENV != 'ci' ]]
then
    echo -n "Version: (${nextVersion}) "
    read VERSION
fi

if [[ "$VERSION" == "" ]]
then
    VERSION=$nextVersion
fi

sed -i "s/\"version\".*/\"version\": \"${VERSION}\",/" package.json
sed -i "s/\"version\".*/\"version\": \"${VERSION}\",/" bower.json

build $VERSION