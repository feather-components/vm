#!/bin/sh

currentVersion=`grep '"version":' package.json | cut -d '"' -f 4`
arr=(${currentVersion//./ }) 
((arr[2]=arr[2]+1))
nextVersion="${arr[0]}.${arr[1]}.${arr[2]}"

VERSION=$1

if [[ "$VERSION" == "" ]]
then
    VERSION=$nextVersion
fi

echo -n "Version: (${VERSION}) "

echo "building...."
webpack
sed -i "" "s/\"version\".*/\"version\": \"${VERSION}\",/" package.json
echo "complete!"

git add -A 
git commit -m "publish ${VERSION}"
git tag -d ${VERSION} 2>&1
git tag -m -a "${VERSION}"
git push origin --force $VERSION:$VERSION