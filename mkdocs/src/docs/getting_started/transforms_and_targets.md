# A list of transforms and their supported targets.

We can split all transforms into two groups: pixel-level transforms, and spatial-level transforms. Pixel-level transforms will change just an input image and will leave any additional targets such as masks, bounding boxes, and keypoints unchanged. Spatial-level transforms will simultaneously change both an input image as well as additional targets such as masks, bounding boxes, and keypoints. For the additional information, please refer to [this section of "Why you need a dedicated library for image augmentation"](../introduction/why_you_need_a_dedicated_library_for_image_augmentation.md#the-need-to-apply-the-same-transform-to-an-image-and-for-labels-for-segmentation-object-detection-and-keypoint-detection-tasks).

## Pixel-level transforms
Here is a list of all available pixel-level transforms. You can apply a spatial-level transform to any target, and under the hood, the transform will change only the input image and return any other input targets such as masks, bounding boxes, or keypoints unchanged.

{{ image_only_transforms_links() }}

## Spatial-level transforms
Here is a table with spatial-level transforms and targets they support. If you try to apply a spatial-level transform to an unsupported target, Albumentations will raise an error.

{{ dual_transforms_table() }}
