#!/bin/bash
set -euo pipefail

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$(dirname "$SCRIPT_DIR")"
WORKSPACE_DIR="$(dirname "$DOCS_DIR")"
ALBUMENTATIONS_DIR="$WORKSPACE_DIR/albumentations"

echo "Starting documentation server..."
echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "DOCS_DIR: $DOCS_DIR"
echo "WORKSPACE_DIR: $WORKSPACE_DIR"

# Set Jupyter platform dirs
export JUPYTER_PLATFORM_DIRS=1

# Set up Python path with default empty value if not set
PYTHONPATH=${PYTHONPATH:-}
export PYTHONPATH="$ALBUMENTATIONS_DIR/tools:$PYTHONPATH"

cd "$DOCS_DIR/src"

# Debug imports before serving
echo "Testing imports..."
python -c "
import sys
print('Python path:', sys.path)
from make_transforms_docs import Targets
print('Successfully imported make_transforms_docs')
import albumentations_docs.main
print('Successfully imported albumentations_docs.main')
"

# Serve docs
mkdocs serve
