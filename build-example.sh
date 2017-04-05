#!/bin/bash

docker build -t "k2data/node-cas-docker:$(git tag)" .
