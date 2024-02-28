#!/bin/bash

npm run clean
tsc --declaration
tsc --removeComments

cd dist

for file in *.js; do
  uglifyjs -mc -o "$file" "$file"
done
