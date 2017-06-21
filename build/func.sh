#!/bin/sh

export NODE_ENV=production

function build(){
    if [[ $1 == "" ]]
    then
        VERSION='beta'
    else
        VERSION=$1
    fi

    VERSION=$1

    echo "building...."
    webpack
    echo "complete!"
    git add -A 
    git commit -m "publish ${VERSION}"
    git tag -d ${VERSION} 2>&1
    git tag -m -a "${VERSION}"
    git push origin --force $VERSION:$VERSION
}