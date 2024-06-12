# Frequently Asked Questions

## Installation

- [I am receiving an error message `Failed building wheel for imagecodecs` when I am trying to install Albumentations. How can I fix the problem?](#i-am-receiving-an-error-message-failed-building-wheel-for-imagecodecs-when-i-am-trying-to-install-albumentations-how-can-i-fix-the-problem)
- [I successfully installed the library, but when I am trying to import it I receive an error `ImportError: libXrender.so.1: cannot open shared object file: No such file or directory`.](#i-successfully-installed-the-library-but-when-i-am-trying-to-import-it-i-receive-an-error-importerror-libxrenderso1-cannot-open-shared-object-file-no-such-file-or-directory)

## Examples

- [Why do you call `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)` in your examples?](#why-do-you-call-cv2cvtcolorimage-cv2color_bgr2rgb-in-your-examples)

## Usage

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Installation](#installation)
  - [Examples](#examples)
  - [Usage](#usage)
  - [Installation](#installation-1)
    - [I am receiving an error message `Failed building wheel for imagecodecs` when I am trying to install Albumentations. How can I fix the problem?](#i-am-receiving-an-error-message-failed-building-wheel-for-imagecodecs-when-i-am-trying-to-install-albumentations-how-can-i-fix-the-problem)
    - [How to disable automatic checks for new versions?](#how-to-disable-automatic-checks-for-new-versions)
    - [I successfully installed the library, but when I am trying to import it I receive an error `ImportError: libXrender.so.1: cannot open shared object file: No such file or directory`.](#i-successfully-installed-the-library-but-when-i-am-trying-to-import-it-i-receive-an-error-importerror-libxrenderso1-cannot-open-shared-object-file-no-such-file-or-directory)
  - [Examples](#examples-1)
    - [Why do you call `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)` in your examples?](#why-do-you-call-cv2cvtcolorimage-cv2color_bgr2rgb-in-your-examples)
  - [Usage](#usage-1)
    - [Supported Image Types](#supported-image-types)
    - [How can I find which augmentations were applied to the input data and which parameters they used?](#how-can-i-find-which-augmentations-were-applied-to-the-input-data-and-which-parameters-they-used)
    - [How to save and load augmentation transforms to HuggingFace Hub?](#how-to-save-and-load-augmentation-transforms-to-huggingface-hub)
    - [My computer vision pipeline works with a sequence of images. I want to apply the same augmentations with the same parameters to each image in the sequence. Can Albumentations do it?](#my-computer-vision-pipeline-works-with-a-sequence-of-images-i-want-to-apply-the-same-augmentations-with-the-same-parameters-to-each-image-in-the-sequence-can-albumentations-do-it)
    - [How to perform balanced scaling?](#how-to-perform-balanced-scaling)
    - [Augmentations have a parameter named `p` that sets the probability of applying that augmentation. How does `p` work in nested containers?](#augmentations-have-a-parameter-named-p-that-sets-the-probability-of-applying-that-augmentation-how-does-p-work-in-nested-containers)
    - [When I use augmentations with the `border_mode` parameter (such as `Rotate`) and set `border_mode` to `cv2.BORDER_REFLECT` or `cv2.BORDER_REFLECT_101` Albumentations mirrors regions of images and masks but doesn't mirror bounding boxes and keypoints. Is it a bug?](#when-i-use-augmentations-with-the-border_mode-parameter-such-as-rotate-and-set-border_mode-to-cv2border_reflect-or-cv2border_reflect_101-albumentations-mirrors-regions-of-images-and-masks-but-doesnt-mirror-bounding-boxes-and-keypoints-is-it-a-bug)
    - [I created annotations for bounding boxes using labeling service or labeling software. How can I use those annotations in Albumentations?](#i-created-annotations-for-bounding-boxes-using-labeling-service-or-labeling-software-how-can-i-use-those-annotations-in-albumentations)

## Installation

### I am receiving an error message `Failed building wheel for imagecodecs` when I am trying to install Albumentations. How can I fix the problem?

Try to update `pip` by running the following command:

```bash
python3 -m pip install --upgrade pip
```

### How to disable automatic checks for new versions?

To disable automatic checks for new versions, set the environment variable `ALBUMENTATIONS_NO_AUTO_UPDATE` to `1`.

### I successfully installed the library, but when I am trying to import it I receive an error `ImportError: libXrender.so.1: cannot open shared object file: No such file or directory`.

Probably your system doesn't have `libXrender`. To install the `libXrender` package on Ubuntu or Debian run:

```bash
 sudo apt-get update
 sudo apt-get install libxrender1
```

To install the package on other operating systems, consult the documentation for the OS' package manager.

## Examples

### Why do you call `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)` in your examples?

[For historical reasons](https://www.learnopencv.com/why-does-opencv-use-bgr-color-format/), OpenCV reads an image in BGR format (so color channels of the image have the following order: Blue, Green, Red). Albumentations uses the most common and popular RGB image format. So when using OpenCV, we need to convert the image format to RGB explicitly.

## Usage

### Supported Image Types

Albumentations works with images of type uint8 and float32. uint8 images should be in the `[0, 255]` range, and float32 images should be in the `[0, 1]` range. If float32 images lie outside of the `[0, 1]` range, they will be automatically clipped to the `[0, 1]` range.

### How can I find which augmentations were applied to the input data and which parameters they used?

To save and inspect parameters of augmentations, you can replace Compose with ReplayCompose. ReplayCompose behaves just like regular Compose, but it also saves information about which augmentations were applied and which parameters were uses. Take a look at the example that shows how you can use ReplayCompose.

### How to save and load augmentation transforms to HuggingFace Hub?

```python
import albumentations as A
import numpy as np

transform = A.Compose([
    A.RandomCrop(256, 256),
    A.HorizontalFlip(),
    A.RandomBrightnessContrast(),
    A.RGBShift(),
    A.Normalize(),
])

transform.save_pretrained("qubvel-hf/albu", key="train")
# The 'key' parameter specifies the context or purpose of the saved transform,
# allowing for organized and context-specific retrieval.
# ^ this will save the transform to a directory "qubvel-hf/albu" with filename "albumentations_config_train.json"

transform.save_pretrained("qubvel-hf/albu", key="train", push_to_hub=True)
# ^ this will save the transform to a directory "qubvel-hf/albu" with filename "albumentations_config_train.json"
# + push the transform to the Hub to the repository "qubvel-hf/albu"

transform.push_to_hub("qubvel-hf/albu", key="train")
# Use `save_pretrained` to save the transform locally and optionally push to the Hub.
# Use `push_to_hub` to directly push the transform to the Hub without saving it locally.
# ^ this will push the transform to the Hub to the repository "qubvel-hf/albu" (without saving it locally)

loaded_transform = A.Compose.from_pretrained("qubvel-hf/albu", key="train")
# ^ this will load the transform from local folder if exist or from the Hub repository "qubvel-hf/albu"
```

See [this example](../examples/example_hfhub/) for more info.

### My computer vision pipeline works with a sequence of images. I want to apply the same augmentations with the same parameters to each image in the sequence. Can Albumentations do it?

Yes. You can define additional images, masks, bounding boxes, or keypoints through the `additional_targets` argument to `Compose`. You can then pass those additional targets to the augmentation pipeline, and Albumentations will augment them in the same way. See [this example](../examples/example_multi_target/) for more info.

### How to perform balanced scaling?

The default scaling logic in `RandomScale`, `ShiftScaleRotate`, and `Affine` transformations is biased towards upscaling.

For example, if `scale_limit = (0.5, 2)`, a user might expect that the image will be scaled down in half of the cases and scaled up in the other half. However, in reality, the image will be scaled up in 75% of the cases and scaled down in only 25% of the cases. This is because the default behavior samples uniformly from the interval `[0.5, 2]`, and the interval `[0.5, 1]` is three times smaller than `[1, 2]`.

To achieve balanced scaling, you can use the OneOf transform as follows:

```python
balanced_scale_transform = A.OneOf([
  A.Affine(scale=(0.5, 1), p=0.5),
  A.Affine(scale=(1, 2), p=0.5)])
```

This approach ensures that exactly half of the samples will be upscaled and half will be downscaled.

### Augmentations have a parameter named `p` that sets the probability of applying that augmentation. How does `p` work in nested containers?

The `p` parameter sets the probability of applying a specific augmentation. When augmentations are nested within a top-level container like `Compose`, the effective probability of each augmentation is the product of the container's probability and the augmentation's probability.

Let's look at an example when a container `Compose` contains one augmentation `Resize`:

```python
transform = A.Compose([
    A.Resize(height=256, width=256, p=1.0),
], p=0.9)
```

In this case, `Resize` has a 90% chance to be applied. This is because there is a 90% chance for `Compose` to be applied (p=0.9). If `Compose` is applied, then `Resize` is applied with 100% probability `(p=1.0)`.

To visualize:

- Probability of `Compose` being applied: 0.9
- Probability of `Resize` being applied given `Compose` is applied: 1.0
- Effective probability of `Resize` being applied: 0.9 * 1.0 = 0.9 (or 90%)

This means that the effective probability of `Resize` being applied is the product of the probabilities of `Compose` and `Resize`, which is `0.9 * 1.0 = 0.9` or 90%. This principle applies to other transformations as well, where the overall probability is the product of the individual probabilities within the transformation pipeline.

Here’s another example:

```python
transform = A.Compose([
    A.Resize(height=256, width=256, p=0.5),
], p=0.9)
```

In this example, Resize has an effective probability of being applied as `0.9 * 0.5` = 0.45 or 45%. This is because `Compose` is applied 90% of the time, and within that 90%, `Resize` is applied 50% of the time.

### When I use augmentations with the `border_mode` parameter (such as `Rotate`) and set `border_mode` to `cv2.BORDER_REFLECT` or `cv2.BORDER_REFLECT_101` Albumentations mirrors regions of images and masks but doesn't mirror bounding boxes and keypoints. Is it a bug?

Unfortunately, adding extra bounding boxes or keypoints to reflected regions of the image is not supported.
You can change `border_mode` mode to `cv2.BORDER_CONSTANT` if this causes a significant impact on the training of your model.

### I created annotations for bounding boxes using labeling service or labeling software. How can I use those annotations in Albumentations?

You need to convert those annotations to one of the formats, supported by Albumentations. For the list of formats, please refer to [this article](getting_started/bounding_boxes_augmentation.md). Consult the documentation of the labeling service to see how you can export annotations in those formats.
