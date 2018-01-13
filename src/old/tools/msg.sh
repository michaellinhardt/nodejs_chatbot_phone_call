#!/bin/bash
curl -s -o /dev/null -X "POST" "http://localhost:4242" -d "{\"message\": \"$*\"}" -H "Content-Type: application/json; charset=utf-8"
exit 0
