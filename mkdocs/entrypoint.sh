#!/usr/bin/env bash

export JUPYTER_PLATFORM_DIRS=1

echo "GOOGLE_ANALYTICS_ID: $GOOGLE_ANALYTICS_ID"

# Convert Jupyter notebooks to Markdown in parallel
find /mkdocs/src/docs -name "*.ipynb" | xargs -n 1 -P 4 jupyter nbconvert --to markdown

python update_mkdocs_yaml.py

if [[ -z "${CONFIG_FILE}" ]]; then
    mkdocs $@
else
    mkdocs $@ --config-file ${CONFIG_FILE}
fi
