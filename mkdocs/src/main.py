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
