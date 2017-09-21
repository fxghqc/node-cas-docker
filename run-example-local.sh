#!/bin/bash

export PORT=5000
export NODE_ENV=production
export SERVICE_PREFIX=http://10.1.30.123:5000
export SERVER_PATH=https://192.168.130.101:8443
export NODE_TLS_REJECT_UNAUTHORIZED=0

node server.js
