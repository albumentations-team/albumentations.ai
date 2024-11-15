#!/bin/bash
set -euo pipefail

# Use environment variables if set, otherwise calculate paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DOCS_DIR="${DOCS_DIR:-$(dirname "$SCRIPT_DIR")}"
export WORKSPACE_DIR="${WORKSPACE_DIR:-$(dirname "$DOCS_DIR")}"
export ALBUMENTATIONS_DIR="${ALBUMENTATIONS_DIR:-$WORKSPACE_DIR/albumentations}"

echo "Building documentation..."
echo "DOCS_DIR: $DOCS_DIR"
echo "WORKSPACE_DIR: $WORKSPACE_DIR"
echo "ALBUMENTATIONS_DIR: $ALBUMENTATIONS_DIR"

# Set up Python path
export PYTHONPATH="${DOCS_DIR}/src:${ALBUMENTATIONS_DIR}/tools:${PYTHONPATH:-}"

cd "$DOCS_DIR/src"

# Debug imports
echo "Testing imports..."
python -c "
import sys
print('Python path:', sys.path)
from make_transforms_docs import Targets
print('Successfully imported make_transforms_docs')
import albumentations_docs.main
print('Successfully imported albumentations_docs.main')
"

# Build docs
mkdocs build
