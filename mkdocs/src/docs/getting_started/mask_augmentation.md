# Mask augmentation for segmentation

For instance and semantic segmentation tasks, you need to augment both the input image and one or more output masks.

Albumentations ensures that the input image and the output mask will receive the same set of augmentations with the same parameters.

The process of augmenting images and masks looks very similar to the [regular image-only augmentation](../getting_started/image_augmentation.md).

1. You import the required libraries.
2. You define an augmentation pipeline.
3. You read images and masks from the disk.
4. You pass an image and one or more masks to the augmentation pipeline and receive augmented images and masks.

## Steps 1 and 2. Import the required libraries and define an augmentation pipeline.

[Image augmentation for classification](../getting_started/image_augmentation.md) described Steps 1 and 2 in great detail. These are the same steps for the simultaneous augmentation of images and masks.

``` python
import albumentations as A
import cv2

transform = A.Compose([
    A.RandomCrop(width=256, height=256),
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.2),
])
```

## Step 3. Read images and masks from the disk.

- Reading an image

``` python
image = cv2.imread("/path/to/image.jpg")
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
```

- For semantic segmentation, you usually read one mask per image. Albumentations expects the mask to be a NumPy array. The height and width of the mask should have the same values as the height and width of the image.


``` python
mask = cv2.imread("/path/to/mask.png")
```

- For instance segmentation, you sometimes need to read multiple masks per image. Then you create a list that contains all the masks.

``` python
mask_1 = cv2.imread("/path/to/mask_1.png")
mask_2 = cv2.imread("/path/to/mask_2.png")
mask_3 = cv2.imread("/path/to/mask_3.png")
masks = [mask_1, mask_2, mask_3]
```

!!! note ""

    Some datasets use other formats to store masks. For example, they can use Run-Length Encoding or Polygon coordinates. In that case, you need to convert a mask to a NumPy before augmenting it with Albumentations. Often dataset authors provide special libraries and tools to simplify the conversion.


## Step 4. Pass image and masks to the augmentation pipeline and receive augmented images and masks.

If the image has one associated mask, you need to call `transform` with two arguments: `image` and `mask`. In `image` you should pass the input image, in `mask` you should pass the output mask. `transform` will return a dictionary with two keys: `image` will contain the augmented image, and `mask` will contain the augmented mask.

``` python
transformed = transform(image=image, mask=mask)
transformed_image = transformed['image']
transformed_mask = transformed['mask']
```

![An image and a mask before and after augmentation.
](../images/getting_started/augmenting_masks/inria_image_and_mask.jpg "An image and a mask before and after augmentation.")

**An image and a mask before and after augmentation. Inria Aerial Image Labeling dataset contains aerial photos as well as their segmentation masks. Each pixel of the mask is marked as 1 if the pixel belongs to the class `building` and 0 otherwise.**


If the image has multiple associated masks, you should use the `masks` argument instead of `mask`. In `masks` you should pass a list of masks.

``` python
transformed = transform(image=image, masks=masks)
transformed_image = transformed['image']
transformed_masks= transformed['masks']
```

## Examples
- [Using Albumentations for a semantic segmentation task](../../examples/example_kaggle_salt/)
- [Showcase. Cool augmentation examples on diverse set of images from various real-world tasks.](../../examples/showcase/)
