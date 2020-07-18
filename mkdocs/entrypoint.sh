#!/usr/bin/env bash

if [[ -z "${CONFIG_FILE}" ]]; then
    mkdocs $@
else
    mkdocs  $@ --config-file ${CONFIG_FILE}
fi
