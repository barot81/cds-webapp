#!/bin/sh
echo 'update configuration'

echo $configUrl
echo $authConfigUrl

echo "{\"configUrl\": \"${configUrl}\"}" > assets/config.json

#this should be in end
exec "$@"
