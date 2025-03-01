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

# Install dependencies
if command -v uv &> /dev/null; then
    PIP_CMD="uv pip install --system"
else
    PIP_CMD="pip install"
fi

# Install Jupyter if not already installed
if ! command -v jupyter &> /dev/null; then
    echo "Jupyter is not installed. Installing Jupyter..."
    $PIP_CMD jupyter
fi

# Create all required directories
mkdir -p "$DOCS_DIR/src/docs/examples"
mkdir -p "$DOCS_DIR/src/docs/integrations/huggingface"
mkdir -p "$DOCS_DIR/src/docs/integrations/roboflow"
mkdir -p "$DOCS_DIR/src/docs/contributing"

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
echo "Copying contributing documentation..."
mkdir -p "$DOCS_DIR/src/docs/contributing"
cp -r "$ALBUMENTATIONS_DIR/docs/contributing/"* "$DOCS_DIR/src/docs/contributing/"

# Create contributing .pages file
echo "nav:
- Coding Guidelines: coding_guidelines.md
- Environment Setup: environment_setup.md" > "$DOCS_DIR/src/docs/contributing/.pages"

# Download HuggingFace files
echo "Downloading HuggingFace files..."
mkdir -p "$DOCS_DIR/src/docs/integrations/huggingface"
wget -O "$DOCS_DIR/src/docs/integrations/huggingface/image_classification_albumentations.ipynb" \
    https://raw.githubusercontent.com/huggingface/notebooks/main/examples/image_classification_albumentations.ipynb

# Convert the Jupyter notebook to markdown
jupyter nbconvert --to markdown "$DOCS_DIR/src/docs/integrations/huggingface/image_classification_albumentations.ipynb" \
    --output "$DOCS_DIR/src/docs/integrations/huggingface/image_classification_albumentations.md"

wget -O "$DOCS_DIR/src/docs/integrations/huggingface/object_detection.md" \
    https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/tasks/object_detection.md

# Use sed with cross-platform compatibility
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/\[\[open-in-colab\]\]//g' "$DOCS_DIR/src/docs/integrations/huggingface/object_detection.md"
else
    # Linux and other Unix-like systems
    sed -i 's/\[\[open-in-colab\]\]//g' "$DOCS_DIR/src/docs/integrations/huggingface/object_detection.md"
fi

# Download Roboflow Notebook
echo "Downloading Roboflow Notebook..."
mkdir -p "$DOCS_DIR/src/docs/integrations/roboflow"
wget -O "$DOCS_DIR/src/docs/integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.ipynb" \
    https://raw.githubusercontent.com/roboflow/notebooks/main/notebooks/train-rt-detr-on-custom-dataset-with-transformers.ipynb

# Convert the Roboflow Jupyter notebook to markdown
jupyter nbconvert --to markdown "$DOCS_DIR/src/docs/integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.ipynb" \
    --output "$DOCS_DIR/src/docs/integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.md"

$PIP_CMD -e "$ALBUMENTATIONS_DIR"
$PIP_CMD -r "$DOCS_DIR/requirements.txt"
$PIP_CMD torch --index-url https://download.pytorch.org/whl/cpu
