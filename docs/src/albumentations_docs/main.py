import copy
import os
import re
import sys
from pathlib import Path

from make_transforms_docs import (
    Targets,
    get_3d_transforms_info,
    get_dual_transforms_info,
    get_image_only_transforms_info,
    make_transforms_targets_links,
    make_transforms_targets_table,
)

# Get the directory where the script is located
SCRIPT_DIR = Path(__file__).parent
DOCS_DIR = Path(os.environ.get("DOCS_DIR", SCRIPT_DIR.parent.parent))  # Use env var if available
WORKSPACE_DIR = DOCS_DIR.parent
ALBUMENTATIONS_DIR = WORKSPACE_DIR / "albumentations"  # This will be correct now

sys.path.append(str(ALBUMENTATIONS_DIR / "tools"))


def replace_path(transforms):
    transforms = copy.deepcopy(transforms)
    for transform in transforms.values():
        transform["docs_link"] = re.sub(
            pattern=r"(\[.*\])\(.*(\#.*)\)",
            repl="\\1(\\2)",
            string=transform["docs_link"],
        )
    return transforms


def extract_benchmarking_results(readme_path: Path) -> str:
    """Extract benchmarking results from README.md."""
    print(f"Looking for README at: {readme_path}")
    print(f"Current working directory: {Path.cwd()}")
    print(f"SCRIPT_DIR: {SCRIPT_DIR}")
    print(f"DOCS_DIR: {DOCS_DIR}")
    print(f"WORKSPACE_DIR: {WORKSPACE_DIR}")
    print(f"ALBUMENTATIONS_DIR: {ALBUMENTATIONS_DIR}")
    print(f"README exists: {readme_path.exists()}")

    if not readme_path.exists():
        return "README.md file not found in albumentations repository"
    try:
        with readme_path.open(encoding="utf-8") as f:
            readme_contents = f.read()

        # Define start and end markers for the benchmarking section
        start_marker = "## Benchmarking results"
        end_marker = "## Contributing"  # Assuming each section starts with "## "
        start_index = readme_contents.find(start_marker)

        if start_index == -1:
            return "Benchmarking results section not found"

        # Find the start of the next section to determine the end of the current section
        end_index = readme_contents.find(end_marker, start_index + len(start_marker))

        # Extract and return the section; if end_index is -1, it's the last section
        return readme_contents[start_index : end_index if end_index != -1 else None]
    except FileNotFoundError:
        return "README.md file not found in albumentations repository"
    except Exception as e:
        return f"Error reading benchmarking results: {e!s}"


def filter_out_init_schema(transforms):
    result = {name: info for name, info in transforms.items() if "InitSchema" not in name}
    return {
        name: {**info, "subclasses": [sc for sc in info.get("subclasses", []) if "InitSchema" not in sc]}
        for name, info in result.items()
    }


def define_env(env):
    image_only_transforms = dict(get_image_only_transforms_info().items())
    dual_transforms = dict(get_dual_transforms_info().items())
    transforms3d = dict(get_3d_transforms_info().items())
    # Filter out InitSchema from both transform types
    image_only_transforms = filter_out_init_schema(image_only_transforms)
    dual_transforms = filter_out_init_schema(dual_transforms)

    @env.macro
    def image_only_transforms_links(only_anchor=False):
        transforms = replace_path(image_only_transforms) if only_anchor else image_only_transforms
        return make_transforms_targets_links(transforms)

    @env.macro
    def dual_transforms_table(only_anchor=False):
        transforms = replace_path(dual_transforms) if only_anchor else dual_transforms
        return make_transforms_targets_table(
            transforms,
            header=["Transform"] + [target.value for target in Targets],
        )

    @env.macro
    def transforms3d_table(only_anchor=False):
        transforms = replace_path(transforms3d) if only_anchor else transforms3d
        return make_transforms_targets_table(
            transforms,
            header=["Transform"] + [target.value for target in Targets],
        )

    @env.macro
    def include_file_content(filepath):
        try:
            with Path(filepath).open() as f:
                return f.read()
        except Exception:
            return ""

    @env.macro
    def benchmarking_results():
        readme_path = ALBUMENTATIONS_DIR / "README.md"
        return extract_benchmarking_results(readme_path)
