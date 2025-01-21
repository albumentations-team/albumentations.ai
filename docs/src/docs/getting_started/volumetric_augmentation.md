# Introduction to 3D Medical Image Augmentation

## Overview

While primarily used for medical imaging (CT scans, MRI), Albumentations' 3D transforms can be applied to various volumetric data types

### Medical Imaging
- CT and MRI scans
- Ultrasound volumes
- PET scans
- Multi-modal medical imaging

### Scientific Data
- Microscopy z-stacks
- Cryo-EM volumes
- Geological seismic data
- Weather radar volumes

### Industrial Applications
- 3D NDT (Non-Destructive Testing) scans
- Industrial CT for quality control
- Material analysis volumes
- 3D ultrasonic testing data

### Computer Vision
- Depth camera sequences
- LiDAR point cloud voxelizations
- Multi-view stereo reconstructions

## Data Format

### Volumes
Albumentations expects 3D volumes as numpy arrays in the following formats:
- `(D, H, W)` - Single-channel volumes (e.g., CT scans)
- `(D, H, W, C)` - Multi-channel volumes (e.g., multi-modal MRI)

Where:
- D = Depth (number of slices)
- H = Height
- W = Width
- C = Channels (optional)

### 3D Masks
Segmentation masks should match the volume dimensions:
- `(D, H, W)` - Binary or single-class masks
- `(D, H, W, C)` - Multi-class masks

## Basic Usage

```python
import albumentations as A
import numpy as np
```

### Create a basic 3D augmentation pipeline

```python
transform = A.Compose([
    # Crop volume to a fixed size for memory efficiency
    A.RandomCrop3D(size=(64, 128, 128), p=1.0),
    # Randomly remove cubic regions to simulate occlusions
    A.CoarseDropout3D(
        num_holes_range=(2, 6),
        hole_depth_range=(0.1, 0.3),
        hole_height_range=(0.1, 0.3),
        hole_width_range=(0.1, 0.3),
        p=0.5
    ),
])
```

### Apply to volume and mask

```python
volume = np.random.rand(96, 256, 256) # Your 3D medical volume
mask = np.zeros((96, 256, 256)) # Your 3D segmentation mask
transformed = transform(volume=volume, mask3d=mask)
transformed_volume = transformed['volume']
transformed_mask = transformed['mask3d']
```

## Available 3D Transforms

Here are some examples of available 3D transforms:

- `CenterCrop3D` - Crop the center part of a 3D volume
- `RandomCrop3D` - Randomly crop a part of a 3D volume
- `Pad3D` - Pad a 3D volume
- `PadIfNeeded3D` - Pad if volume size is less than desired size
- `CoarseDropout3D` - Random dropout of 3D cubic regions
- `CubicSymmetry` - Apply random cubic symmetry transformations

For a complete and up-to-date list of all available 3D transforms, please see our [API Reference](api_reference/augmentations/3d_transforms.md).

## Combining 2D and 3D Transforms

You can combine 2D and 3D transforms in the same pipeline. 2D transforms will be applied slice-by-slice in the XY plane:

```python
transform = A.Compose([
    # 3D transforms
    A.RandomCrop3D(size=(64, 128, 128)),
    # 2D transforms (applied to each XY slice)
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.2),
])

transformed = transform(volume=volume, mask3d=mask)
transformed_volume = transformed['volume']
transformed_mask = transformed['mask3d']
```


## Best Practices

1. **Memory Management**: 3D volumes can be large. Consider using smaller crop sizes or processing in patches.
   - Place cropping operations at the beginning of your pipeline for better performance
   - Example: A `256x256x256` volume cropped to `64x64x64` will process subsequent transforms ~64x faster

### Efficient pipeline - cropping first
```python
efficient_transform = A.Compose([
A.RandomCrop3D(size=(64, 64, 64)), # Do this first!
A.CoarseDropout3D(...),
A.RandomBrightnessContrast(...)
])
```

### Less efficient pipeline - processing full volume unnecessarily
```python
inefficient_transform = A.Compose([
A.CoarseDropout3D(...), # Processing full volume
A.RandomBrightnessContrast(...), # Processing full volume
A.RandomCrop3D(size=(64, 64, 64)) # Cropping at the end
])
```

2. **Avoid Interpolation Artifacts**: For highest quality augmentation, prefer transforms that only rearrange existing voxels without interpolation:

   a) Available Artifact-Free Transforms:
      - `HorizontalFlip`, `VerticalFlip` - Mirror images across X or Y axes
      - `RandomRotate90` - Rotate by 90 degrees in XY plane
      - `D4` - All possible combinations of flips and 90-degree rotations in XY plane (8 variants)
      - `CubicSymmetry` - 3D extension of D4, includes all 48 possible cube symmetries

   These transforms maintain perfect image quality because they only move existing voxels to new positions without creating new values through interpolation.

    b) Benefits of Artifact-Free Transforms:
    - Preserve original voxel values exactly
    - Maintain spatial relationships between tissues
    - No blurring or information loss
    - Faster computation (no interpolation needed)

## Example Pipeline

Here's a complete example of a medical image augmentation pipeline:

```python
import albumentations as A
import numpy as np

def create_3d_pipeline(
    crop_size=(64, 128, 128),
    p_spatial=0.5,
    p_intensity=0.3
    ):
    return A.Compose([
        # Spatial transforms
        A.RandomCrop3D(
            size=crop_size,
            p=1.0
        ),
        A.CubicSymmetry(p=p_spatial),
        # Intensity transforms
        A.CoarseDropout3D(
            num_holes_range=(2, 5),
            hole_depth_range=(0.1, 0.2),
            hole_height_range=(0.1, 0.2),
            hole_width_range=(0.1, 0.2),
            p=p_intensity
        ),
    ])
```

### Usage

```python
transform = create_3d_pipeline()
volume = np.random.rand(96, 256, 256)
mask = np.zeros((96, 256, 256))
transformed = transform(volume=volume, mask3d=mask)
```


## Next Steps

- Learn about [Video Augmentation](./video_augmentation.md) for sequential data
