#!/bin/bash
if [ -z "$1" ]; then
    echo "pass a commit message"
    exit 1
fi

git add .
git commit -am "$1"
git push
cd /Users/ravenorourke/code/src/rorour/VordliHelper/vordli-helper
npm run build
cd /Users/ravenorourke/code/src/rorour/VordliHelper/vordli-helper/build
aws s3 cp . s3://vordlihelper --recursive