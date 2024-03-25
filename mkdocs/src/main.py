import copy
import re
import sys
from pathlib import Path

sys.path.append("/albumentations/tools")


from make_transforms_docs import (
    Targets,
    get_dual_transforms_info,
    get_image_only_transforms_info,
    get_mixing_transforms_info,
    make_transforms_targets_links,
    make_transforms_targets_table,
)


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
    with readme_path.open(encoding="utf-8") as f:
        readme_contents = f.read()

    # Define start and end markers for the benchmarking section
    start_marker = "## Benchmarking results"
    end_marker = "##"  # Assuming each section starts with "## "
    start_index = readme_contents.find(start_marker)

    # Find the start of the next section to determine the end of the current section
    end_index = readme_contents.find(end_marker, start_index + len(start_marker))

    # Extract and return the section; if end_index is -1, it's the last section
    result = readme_contents[start_index : end_index if end_index != -1 else None]
    print("R = ", result)
    return readme_contents[start_index : end_index if end_index != -1 else None]


def define_env(env):
    image_only_transforms = dict(get_image_only_transforms_info().items())
    dual_transforms = dict({**get_mixing_transforms_info(), **get_dual_transforms_info()}.items())

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
    def include_file_content(filepath):
        try:
            with Path(filepath).open() as f:
                return f.read()
        except Exception:
            return ""

    @env.macro
    def benchmarking_results():
        readme_path = Path("/albumentations/README.md")
        return extract_benchmarking_results(readme_path)
