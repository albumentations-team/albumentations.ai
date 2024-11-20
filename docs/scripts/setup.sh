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

# Create all required directories
mkdir -p "$DOCS_DIR/src/docs/examples"
mkdir -p "$DOCS_DIR/src/docs/integrations/huggingface"
mkdir -p "$DOCS_DIR/src/docs/integrations/roboflow"
mkdir -p "$DOCS_DIR/src/docs/contributing"  # Added this line

# Clone repositories if they don't exist
if [ ! -d "$ALBUMENTATIONS_DIR" ]; then
    echo "Cloning albumentations repository..."
    git clone --depth=1 --branch main --single-branch \
        https://github.com/albumentations-team/albumentations.git "$ALBUMENTATIONS_DIR"
fi

# Copy and fix CONTRIBUTING.md
echo "Copying and fixing CONTRIBUTING.md..."
sed 's|docs/contributing/|contributing/|g' "$ALBUMENTATIONS_DIR/CONTRIBUTING.md" > "$DOCS_DIR/src/docs/CONTRIBUTING.md"

# Copy contributing directory contents and create .pages
if [ -d "$ALBUMENTATIONS_DIR/docs/contributing" ]; then
    echo "Copying contributing documentation..."
    mkdir -p "$DOCS_DIR/src/docs/contributing"
    cp -r "$ALBUMENTATIONS_DIR/docs/contributing/"* "$DOCS_DIR/src/docs/contributing/"

    # Create contributing .pages file
    echo "nav:
  - Coding Guidelines: coding_guidelines.md
  - Environment Setup: environment_setup.md" > "$DOCS_DIR/src/docs/contributing/.pages"
else
    echo "Warning: Contributing documentation directory not found in albumentations repo"
fi

# Install dependencies
if command -v uv &> /dev/null; then
    PIP_CMD="uv pip install --system"
else
    PIP_CMD="pip install"
fi

$PIP_CMD -e "$ALBUMENTATIONS_DIR"
$PIP_CMD -r "$DOCS_DIR/requirements.txt"
$PIP_CMD torch --index-url https://download.pytorch.org/whl/cpu
