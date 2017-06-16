#!/usr/bin/env sh

currentVersion=`grep '"version":' package.json | cut -d '"' -f 4`

if [[ $NODE_ENV == 'ci' ]]
then
    VERSION=$currentVersion
else
    echo -n "Version: (${currentVersion}) "
    read VERSION
fi

if [[ "$VERSION" != "" ]]
then
    sed -i "s/\"version\".*/\"version\": \"${VERSION}\",/" package.json
else
    VERSION=$currentVersion
fi

cat package.json > bower.json
echo "building...."
webpack
echo "complete!"
git add -A 
git commit -m "publish ${VERSION}"
git tag -m -a "${VERSION}"
git push origin --force $VERSION:$VERSION