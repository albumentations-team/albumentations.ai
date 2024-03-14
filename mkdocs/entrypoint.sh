#!/usr/bin/env bash

export JUPYTER_PLATFORM_DIRS=1

echo "GOOGLE_ANALYTICS_ID: $GOOGLE_ANALYTICS_ID"

python update_mkdocs_yaml.py

if [[ -z "${CONFIG_FILE}" ]]; then
    mkdocs $@ -v
else
    mkdocs  $@ --config-file ${CONFIG_FILE} -v
fi
