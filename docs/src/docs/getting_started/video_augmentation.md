# Working with Video Data in Albumentations

## Overview

While Albumentations is primarily known for image augmentation, it can effectively process video data by treating it as a sequence of frames. When you pass a video as a numpy array, Albumentations will apply the same transform with identical parameters to each frame, ensuring temporal consistency.

## Data Format

### Video Frames
Albumentations accepts video data as numpy arrays in the following formats:
- `(N, H, W)` - Grayscale video (N frames)
- `(N, H, W, C)` - Color video (N frames)

Where:
- N = Number of frames
- H = Height
- W = Width 
- C = Channels (e.g., 3 for RGB)

### Video Masks
For video segmentation tasks, masks should match the frame dimensions:
- `(N, H, W)` - Binary or single-class masks
- `(N, H, W, C)` - Multi-class masks

## Basic Usage

```python
import albumentations as A
import numpy as np
```

## Create transform pipeline

```python
transform = A.Compose([
    A.RandomCrop(height=224, width=224),
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.2),
], seed=42)
```

### Example video data

```python
video = np.random.rand(32, 256, 256, 3) # 32 RGB frames
masks = np.zeros((32, 256, 256)) # 32 binary masks
```

### Apply transform

```python
augmented_video = transform(images=video, masks=masks)
```

### Apply transforms - same parameters for all frames

```python
transformed = transform(images=video, mask=masks)
transformed_video = transformed['image']
transformed_masks = transformed['mask']
```


## Key Features

1. **Temporal Consistency**: The same transform with identical parameters is applied to all frames, preserving temporal consistency.

2. **Memory Efficiency**: Frames are processed as a batch, avoiding repeated parameter generation.

3. **Compatible with All Transforms**: Works with any Albumentations transform that supports the image target.

## Example Pipeline for Video Processing


```python
def create_video_pipeline(
    crop_size=(224, 224),
    p_spatial=0.5,
    p_color=0.3
    ):
    return A.Compose([
        # Spatial transforms - same crop/flip for all frames
        A.RandomCrop(
            height=crop_size[0],
            width=crop_size[1],
            p=1.0
        ),
        A.HorizontalFlip(p=p_spatial),
        # Color transforms - same adjustment for all frames
        A.ColorJitter(
            brightness=0.2,
            contrast=0.2,
            saturation=0.2,
            hue=0.1,
            p=p_color
        ),
        # Noise/blur - same pattern for all frames
        A.GaussianBlur(p=0.3),
    ])
```

## Best Practices

1. **Performance Optimization**:
   - Place cropping operations first to reduce computation
   - Consider frame rate and whether all frames need processing


## Next Steps

- Learn about [Volumetric Data (3D)](getting_started/volumetric_augmentation.md) for volumetric data
