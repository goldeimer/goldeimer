#!/usr/bin/env sh
# -*- coding: utf-8 -*-

# TODO:
# Replace w/ lerna:exec [...]
yarn workspace @goldeimer/goldeimer-wordpress-theme build:prod &&

git add --force packages/**/static &&
git commit -m "package(php): add most recent static files" &&

composer monorepo:split &&
git reset HEAD~1
