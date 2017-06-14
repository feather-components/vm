#!/usr/bin/env sh

currentVersion=`grep '"version":' package.json | cut -d '"' -f 4`
echo -n "Version: (${currentVersion}) "
read VERSION

if [[ "$VERSION" != "" ]]
then
    sed -i "s/\"version\".*/\"version\": \"${VERSION}\",/" package.json
fi

cat package.json > bower.json
git add -A 
git commit -m "publish ${VERSION}"
git tag -m -a "${VERSION}"