import copy
import re
import sys
from pathlib import Path

sys.path.append("/albumentations/tools")

from make_transforms_docs import (
    Targets,
    get_transforms_info,
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


def define_env(env):
    transforms_info = get_transforms_info()
    image_only_transforms = {transform: info for transform, info in transforms_info.items() if info["image_only"]}
    dual_transforms = {transform: info for transform, info in transforms_info.items() if not info["image_only"]}

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
