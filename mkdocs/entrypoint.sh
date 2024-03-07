#!/usr/bin/env bash

export JUPYTER_PLATFORM_DIRS=1


if [[ -z "${CONFIG_FILE}" ]]; then
    mkdocs $@ -v
else
    mkdocs  $@ --config-file ${CONFIG_FILE} -v
fi
