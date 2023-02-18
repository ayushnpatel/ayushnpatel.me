#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# add dist
git add dist -f

# if you are deploying to a custom domain
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git subtree push -f --prefix dist origin gh-pages