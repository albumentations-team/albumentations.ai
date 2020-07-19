# Frequently Asked Questions

**Installation**

- [I am receiving an error message `Failed building wheel for imagecodecs` when I am trying to install Albumentations. How can I fix the problem?](#i-am-receiving-an-error-message-failed-building-wheel-for-imagecodecs-when-i-am-trying-to-install-albumentations-how-can-i-fix-the-problem)
- [I successfully installed the library, but when I am trying to import it I receive an error `ImportError: libXrender.so.1: cannot open shared object file: No such file or directory`.](#i-successfully-installed-the-library-but-when-i-am-trying-to-import-it-i-receive-an-error-importerror-libxrenderso1-cannot-open-shared-object-file-no-such-file-or-directory)

**Examples**

- [Why do you call `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)` in your examples?](#why-do-you-call-cv2cvtcolorimage-cv2color_bgr2rgb-in-your-examples)

**Usage**

- [Which transformation should I use to convert a NumPy array with an image or a mask to a PyTorch tensor: `ToTensor()` or `ToTensorV2()`](#which-transformation-should-i-use-to-convert-a-numpy-array-with-an-image-or-a-mask-to-a-pytorch-tensor-totensor-or-totensorv2)?
- [How can I find which augmentations were applied to the input data and which parameters they used?](#how-can-i-find-which-augmentations-were-applied-to-the-input-data-and-which-parameters-they-used)
- [My computer vision pipeline works with a sequence of images. I want to apply the same augmentations with the same parameters to each image in the sequence. Can Albumentations do it?](#my-computer-vision-pipeline-works-with-a-sequence-of-images-i-want-to-apply-the-same-augmentations-with-the-same-parameters-to-each-image-in-the-sequence-can-albumentations-do-it)
- [I want to augment 16-bit TIFF images. Can Albumentations work with them?](#i-want-to-augment-16-bit-tiff-images-can-albumentations-work-with-them)
- [Augmentations have a parameter named `p` that sets the probability of applying that augmentation, but they also have the `always_apply` parameter that can either be `True` or `False`. What is the difference between `p` and `always_apply`? Is `always_apply=True` equals to `p=1.0`?](#augmentations-have-a-parameter-named-p-that-sets-the-probability-of-applying-that-augmentation-but-they-also-have-the-always_apply-parameter-that-can-either-be-true-or-false-what-is-the-difference-between-p-and-always_apply-is-always_applytrue-equals-to-p10)
- [When I use augmentations with the `border_mode` parameter (such as `Rotate`) and set `border_mode` to `cv2.BORDER_REFLECT` or `cv2.BORDER_REFLECT_101` Albumentations mirrors regions of images and masks but doesn't mirror bounding boxes and keypoints. Is it a bug?](#when-i-use-augmentations-with-the-border_mode-parameter-such-as-rotate-and-set-border_mode-to-cv2border_reflect-or-cv2border_reflect_101-albumentations-mirrors-regions-of-images-and-masks-but-doesnt-mirror-bounding-boxes-and-keypoints-is-it-a-bug)
- [I created annotations for bounding boxes using labeling service or labeling software. How can I use those annotations in Albumentations?](#i-created-annotations-for-bounding-boxes-using-labeling-service-or-labeling-software-how-can-i-use-those-annotations-in-albumentations)

## Installation

### I am receiving an error message `Failed building wheel for imagecodecs` when I am trying to install Albumentations. How can I fix the problem?

Try to update `pip` by running the following command:
```
python3 -m pip install --upgrade pip
```


### I successfully installed the library, but when I am trying to import it I receive an error `ImportError: libXrender.so.1: cannot open shared object file: No such file or directory`.

Probably your system doesn't have `libXrender`. To install the `libXrender` package on Ubuntu or Debian run:
```
 sudo apt-get update
 sudo apt-get install libxrender1
```

To install the package on other operating systems, consult the documentation for the OS' package manager.


## Examples

### Why do you call `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)` in your examples?
[For historical reasons](https://www.learnopencv.com/why-does-opencv-use-bgr-color-format/), OpenCV reads an image in BGR format (so color channels of the image have the following order: Blue, Green, Red). Albumentations uses the most common and popular RGB image format. So when using OpenCV, we need to convert the image format to RGB explicitly.

## Usage

### Which transformation should I use to convert a NumPy array with an image or a mask to a PyTorch tensor: `ToTensor()` or `ToTensorV2()`?
Always use [`ToTensorV2()`](api_reference/pytorch/transforms.md#albumentations.pytorch.transforms.ToTensorV2).

`ToTensor()` is a legacy transformation that contains complex and unnecessary logic for mask transformation. We don't want to break the existing pipelines that use that transformation, so instead of changing the behavior of the original `ToTensor()`, we created a new, more simple transformation.

`ToTensor()` is now deprecated and will be removed in future versions. For all new projects, you should always use ToTensorV2().


### How can I find which augmentations were applied to the input data and which parameters they used?
To save and inspect parameters of augmentations, you can replace Compose with ReplayCompose. ReplayCompose behaves just like regular Compose, but it also saves information about which augmentations were applied and which parameters were uses. Take a look at the example that shows how you can use ReplayCompose.


### My computer vision pipeline works with a sequence of images. I want to apply the same augmentations with the same parameters to each image in the sequence. Can Albumentations do it?
Yes. You can define additional images, masks, bounding boxes, or keypoints through the `additional_targets` argument to `Compose`. You can then pass those additional targets to the augmentation pipeline, and Albumentations will augment them in the same way. See [this example](../examples/example_multi_target/) for more info.


### I want to augment 16-bit TIFF images. Can Albumentations work with them?
Yes. Albumentations can also work with non-8-bit images. See [this example](../examples/example_16_bit_tiff/
) for more info.


### Augmentations have a parameter named `p` that sets the probability of applying that augmentation, but they also have the `always_apply` parameter that can either be `True` or `False`. What is the difference between `p` and `always_apply`? Is `always_apply=True` equals to `p=1.0`?

When `always_apply` is set to `True`, Albumentations will always apply that transform, even if `p` is set to a value less than `1.0`. However, `always_apply=True` doesn't equal to `p=1.0` because with `always_apply=True`, Albumentations will apply a transform even in a case when top-level containers are not applied.

Let's look at an example when a container `Compose` contains one augmentation `Resize`:

```python
transform = A.Compose([
    A.Resize(height=256, width=256, p=1.0),
], p=0.9)
```

If you set `p=1.0` for `Resize` and `p=0.9` for `Compose`, then `Resize` has a 90% chance to be applied, because there is a 90% chance for `Compose` to be applied and if `Compose` is applied, there is a 100% chance for `Resize` to be applied.


But if you set `always_apply=True` for `Resize`, Albumentations will apply it with 100% probability even if Albumentations decides not to apply the parent container (`Compose` in the example):

```python
transform = A.Compose([
    A.Resize(height=256, width=256, always_apply=True),
], p=0.9)
```


### When I use augmentations with the `border_mode` parameter (such as `Rotate`) and set `border_mode` to `cv2.BORDER_REFLECT` or `cv2.BORDER_REFLECT_101` Albumentations mirrors regions of images and masks but doesn't mirror bounding boxes and keypoints. Is it a bug?

Unfortunately, adding extra bounding boxes or keypoints to reflected regions of the image is not supported.
You can change `border_mode` mode to `cv2.BORDER_CONSTANT` if this causes a significant impact on the training of your model.


### I created annotations for bounding boxes using labeling service or labeling software. How can I use those annotations in Albumentations?

You need to convert those annotations to one of the formats, supported by Albumentations. For the list of formats, please refer to [this article](getting_started/bounding_boxes_augmentation.md
). Consult the documentation of the labeling service to see how you can export annotations in those formats.
