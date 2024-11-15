#!/bin/bash

set -euo pipefail

NOTEBOOKS_DIR="src/docs/examples"
EXAMPLES_REPO="https://github.com/albumentations-team/albumentations_examples.git"
NUM_PARALLEL_JOBS=4  # Adjust based on your CPU cores

echo "Creating notebooks directory..."
mkdir -p "$NOTEBOOKS_DIR"

echo "Downloading notebooks from albumentations-examples..."
if [ -d "temp_examples" ]; then
    rm -rf temp_examples
fi

git clone --depth=1 --branch main --single-branch "$EXAMPLES_REPO" temp_examples
cp -r temp_examples/notebooks/* "$NOTEBOOKS_DIR/"

echo "Converting notebooks in parallel..."
find "$NOTEBOOKS_DIR" -name "*.ipynb" | xargs -n 1 -P 4 jupyter nbconvert --to markdown

rm -rf temp_examples

echo "Cleaning up intermediate files..."
find "$NOTEBOOKS_DIR" -name "*.nbconvert.*" -delete

if [ $? -eq 0 ]; then
    echo "Successfully downloaded and converted all notebooks"
else
    echo "Error converting notebooks"
    exit 1
fi
