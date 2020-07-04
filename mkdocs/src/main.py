import sys

sys.path.append("/albumentations/tools")

from make_transforms_docs import (
    get_transforms_info,
    make_transforms_targets_links,
    make_transforms_targets_table,
    Targets,
)  # noqa: E402


def define_env(env):
    transforms_info = get_transforms_info()
    for transform in transforms_info.values():
        if not transform["docs_link"]:
            continue
        transform["docs_link"] = (
            transform["docs_link"]
            .replace(
                "https://albumentations.readthedocs.io/en/latest/api/augmentations.html",
                "/api_reference/augmentations/transforms/",
            )
            .replace(
                "https://albumentations.readthedocs.io/en/latest/api/imgaug.html", "/api_reference/imgaug/transforms/",
            )
        )
    image_only_transforms = {transform: info for transform, info in transforms_info.items() if info["image_only"]}
    dual_transforms = {transform: info for transform, info in transforms_info.items() if not info["image_only"]}

    @env.macro
    def image_only_transforms_links():
        return make_transforms_targets_links(image_only_transforms)

    @env.macro
    def dual_transforms_table():
        return make_transforms_targets_table(
            dual_transforms, header=["Transform"] + [target.value for target in Targets]
        )
