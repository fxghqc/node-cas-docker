#!/bin/bash

docker run \
  -e "NODE_ENV=production" \
  -e "SERVICE_PREFIX=http://10.1.10.17:5060" \
  -e "SERVER_PATH=https://192.168.130.115:8443" \
  -e "NODE_TLS_REJECT_UNAUTHORIZED=0" \
  -u "node" \
  -m "300M" --memory-swap "1G" \
  -w "/home/node/app" \
  -p 5060:3000 \
  --name "nodejs-cas-container" \
  -d \
  k2data/node-cas-docker
