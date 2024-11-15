#!/bin/bash
set -euo pipefail

# Get absolute paths
WORKSPACE_DIR=$(cd "${WORKSPACE_DIR:-$(pwd)/..}" && pwd)
ALBUMENTATIONS_DIR=${WORKSPACE_DIR}/albumentations
DOCS_DIR=${WORKSPACE_DIR}/docs

# Export paths for Python scripts
export WORKSPACE_DIR
export DOCS_DIR
export ALBUMENTATIONS_DIR

echo "Using paths:"
echo "WORKSPACE_DIR: $WORKSPACE_DIR"
echo "DOCS_DIR: $DOCS_DIR"
echo "ALBUMENTATIONS_DIR: $ALBUMENTATIONS_DIR"

# Clone repositories if they don't exist
if [ ! -d "$ALBUMENTATIONS_DIR" ]; then
    echo "Cloning albumentations repository..."
    git clone --depth=1 --branch main --single-branch \
        https://github.com/albumentations-team/albumentations.git "$ALBUMENTATIONS_DIR"
fi

# Create required directories
mkdir -p "$DOCS_DIR/src/docs/examples"
mkdir -p "$DOCS_DIR/src/docs/integrations/huggingface"
mkdir -p "$DOCS_DIR/src/docs/integrations/roboflow"

# Copy CONTRIBUTING.md from albumentations
echo "Copying CONTRIBUTING.md..."
cp "$ALBUMENTATIONS_DIR/CONTRIBUTING.md" "$DOCS_DIR/src/docs/"

# Install dependencies
if command -v uv &> /dev/null; then
    PIP_CMD="uv pip install --system"
else
    PIP_CMD="pip install"
fi

$PIP_CMD -e "$ALBUMENTATIONS_DIR"
$PIP_CMD -r "$DOCS_DIR/requirements.txt"
$PIP_CMD torch --index-url https://download.pytorch.org/whl/cpu
