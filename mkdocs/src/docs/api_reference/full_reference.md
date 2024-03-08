# Full API Reference on a single page

## Pixel-level transforms

Here is a list of all available pixel-level transforms. You can apply a pixel-level transform to any target, and under the hood, the transform will change only the input image and return any other input targets such as masks, bounding boxes, or keypoints unchanged.

{{ image_only_transforms_links(only_anchor=True) }}

## Spatial-level transforms

Here is a table with spatial-level transforms and targets they support. If you try to apply a spatial-level transform to an unsupported target, Albumentations will raise an error.

{{ dual_transforms_table(only_anchor=True) }}

::: albumentations
