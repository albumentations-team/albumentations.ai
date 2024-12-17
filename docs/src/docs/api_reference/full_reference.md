# Full API Reference on a single page

## Transform Types

### 1. Pixel-level transforms
Transforms that modify pixel values without changing spatial relationships. These can be safely applied to any target as they only affect the input image, leaving other targets (masks, bounding boxes, keypoints) unchanged.

{{ image_only_transforms_links(only_anchor=True) }}

### 2. Spatial-level transforms
Transforms that modify the spatial arrangement of pixels/features. Different targets have different spatial transform support - see the compatibility table below:

{{ dual_transforms_table(only_anchor=True) }}

### 3. Volumetric (3D) transforms
Transforms designed for three-dimensional data (D, H, W). These operate on volumes and their corresponding 3D masks, supporting both single-channel and multi-channel data.

{{ transforms3d_table(only_anchor=True) }}
