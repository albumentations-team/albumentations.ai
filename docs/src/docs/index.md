# Welcome to Albumentations documentation

Albumentations is a fast and flexible image augmentation library. The library is widely used in [industry](https://albumentations.ai/whos_using#industry), [deep learning research](https://albumentations.ai/whos_using#research), [machine learning competitions](https://albumentations.ai/whos_using#competitions), and [open source projects](https://albumentations.ai/whos_using#open-source). Albumentations is written in Python, and it is licensed under the MIT license. The source code is available at [https://github.com/albumentations-team/albumentations](https://github.com/albumentations-team/albumentations).

If you are new to image augmentation, start with our ["Learning Path"](#learning-path) for beginners. It describes what image augmentation is, how it can boost deep neural networks' performance, and why you should use Albumentations.

For hands-on experience, check out our ["Quick Start Guide"](#quick-start-guide) and ["Examples"](#examples) sections. They show how you can use the library for different computer vision tasks: image classification, semantic segmentation, instance segmentation, object detection, and keypoint detection. Each example includes a link to Google Colab, where you can run the code by yourself.

You can also visit [explore.albumentations.ai](https://explore.albumentations.ai) to visually explore and experiment with different augmentations in your browser. This interactive tool helps you better understand how each transform affects images before implementing it in your code.

["API Reference"](#api-reference) contains the description of Albumentations' methods and classes.

## Quick Start Guide

- [Installation](getting_started/installation.md)
- [Frequently Asked Questions](faq.md)
- [Your First Augmentation Pipeline](examples/example/)

## Working with Multi-dimensional Data

### Medical Volumetric Data (3D)
- [Introduction to 3D Medical Image Augmentation](getting_started/volumetric_augmentation.md)
- [Working with CT/MRI Volumes](examples/example_3d_medical/)
- [Available 3D Transforms](api_reference/augmentations/3d_transforms.md)

### Video and Sequential Data
- [Video Frame Augmentation](getting_started/video_augmentation.md) 
- [Working with Video Sequences](examples/example_video/)
- [Temporal Consistency in Augmentations](advanced/temporal_augmentation.md)


## Learning Path

### Beginners

- [What is Image Augmentation?](introduction/image_augmentation.md)
- [Why Choose Albumentations?](introduction/why_albumentations.md)
- [Basic Image Classification](getting_started/image_augmentation.md)

### Intermediate

- [Semantic Segmentation](getting_started/mask_augmentation.md)
- [Object Detection](getting_started/bounding_boxes_augmentation.md)
- [Keypoint Detection](getting_started/keypoints_augmentation.md)
- [Multi-target Augmentation](getting_started/simultaneous_augmentation.md)

### Advanced

- [Pipeline Configuration](getting_started/setting_probabilities.md)
- [Debugging with ReplayCompose](examples/replay/)
- [Serialization](examples/serialization/)

## Framework Integration

- [PyTorch](examples/pytorch_classification/)
- [TensorFlow](examples/tensorflow-example/)
- [HuggingFace](integrations/huggingface/)
- [Roboflow](integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.md)
- [Voxel51](integrations/fiftyone.md)

## Library Comparisons

- [Transform Library Comparison](getting_started/augmentation_mapping.md) - Find equivalent transforms between Albumentations and other libraries (torchvision, Kornia)
- [Migration from torchvision](examples/migrating_from_torchvision_to_albumentations/) - Step-by-step migration guide

## Examples

- [Defining a simple augmentation pipeline for image augmentation](examples/example/)
- [Using Albumentations to augment bounding boxes for object detection tasks](examples/example_bboxes/)
- [How to use Albumentations for detection tasks if you need to keep all bounding boxes](examples/example_bboxes2/)
- [Using Albumentations for a semantic segmentation task](examples/example_kaggle_salt/)
- [Using Albumentations to augment keypoints](examples/example_keypoints/)
- [Applying the same augmentation with the same parameters to multiple images, masks, bounding boxes, or keypoints](examples/example_multi_target/)
- [Weather augmentations in Albumentations](examples/example_weather_transforms/)
- [Example of applying XYMasking transform](examples/example_xymasking/)
- [Example of applying ChromaticAberration transform](examples/example_chromatic_aberration/)
- [Example of applying Morphological transform](examples/example_documents/)
- [Example of applying D4 transform](examples/example_d4/)
- [Example of applying RandomGridShuffle transform](examples/example_gridshuffle/)
- [Example of applying OverlayElements transform](examples/example_OverlayElements/)
- [Example of applying TextImage transform](examples/example_textimage/)
- [Debugging an augmentation pipeline with ReplayCompose](examples/replay/)
- [How to save and load parameters of an augmentation pipeline](examples/serialization/)
- [Showcase. Cool augmentation examples on diverse set of images from various real-world tasks.](examples/showcase/)
- [How to save and load transforms to HuggingFace Hub.](examples/example_hfhub/)

## Examples of how to use Albumentations with different deep learning frameworks

- [PyTorch and Albumentations for image classification](examples/pytorch_classification/)
- [PyTorch and Albumentations for semantic segmentation](examples/pytorch_semantic_segmentation/)
- [Using Albumentations with Tensorflow](examples/tensorflow-example/)

## External resources

- [Blog posts, podcasts, talks, and videos about Albumentations](external_resources/blog_posts_podcasts_talks.md)
- [Books that mention Albumentations](external_resources/books.md)
- [Online courses that cover Albumentations](external_resources/online_courses.md)

## Other topics

- [Contributing](CONTRIBUTING.md)

## API Reference

- [Full API Reference on a single page](api_reference/full_reference.md)
- [Index](api_reference/index.md)
  - [Core API (albumentations.core)](api_reference/core/index.md)
  - [Augmentations (albumentations.augmentations)](api_reference/augmentations/index.md)
  - [PyTorch Helpers (albumentations.pytorch)](api_reference/pytorch/index.md)
