#!/bin/bash
set -euo pipefail

# Use environment variables if set, otherwise calculate paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DOCS_DIR="${DOCS_DIR:-$(dirname "$SCRIPT_DIR")}"
export WORKSPACE_DIR="${WORKSPACE_DIR:-$(dirname "$DOCS_DIR")}"
export ALBUMENTATIONS_DIR="${ALBUMENTATIONS_DIR:-$WORKSPACE_DIR/albumentations}"

echo "Using paths:"
echo "DOCS_DIR: $DOCS_DIR"
echo "WORKSPACE_DIR: $WORKSPACE_DIR"
echo "ALBUMENTATIONS_DIR: $ALBUMENTATIONS_DIR"

# Create required directories
mkdir -p "$DOCS_DIR/src/docs/examples"
mkdir -p "$DOCS_DIR/src/docs/integrations/huggingface"
mkdir -p "$DOCS_DIR/src/docs/integrations/roboflow"

# Clone repositories if they don't exist
if [ ! -d "$ALBUMENTATIONS_DIR" ]; then
    echo "Cloning albumentations repository..."
    git clone --depth=1 --branch main --single-branch \
        https://github.com/albumentations-team/albumentations.git "$ALBUMENTATIONS_DIR"
fi

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
