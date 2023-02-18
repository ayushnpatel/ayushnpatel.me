#!/usr/bin/env sh

# abort on errors
set -e

git branch -d origin/gh-pages

git checkout gh-pages
git push -u origin gh-pages
git checkout main

# build
npm run build

# add dist
git add dist -f

# if you are deploying to a custom domain
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git subtree push --prefix dist origin gh-pages