# Welcome to Albumentations documentation

Albumentations is a fast and flexible image augmentation library. The library is widely used in [industry](https://albumentations.ai/whos_using#industry), [deep learning research](https://albumentations.ai/whos_using#research), [machine learning competitions](https://albumentations.ai/whos_using#competitions), and [open source projects](https://albumentations.ai/whos_using#open-source). Albumentations is written in Python, and it is licensed under the MIT license. The source code is available at [https://github.com/albumentations-team/albumentations](https://github.com/albumentations-team/albumentations).

If you are new to image augmentation, start with articles in the ["Introduction to image augmentation"](#introduction-to-image-augmentation) section. They describe what image augmentation is, how it can boost deep neural networks' performance, and why you should use Albumentations.

Articles in the ["Getting started with Albumentations"](#getting-started-with-albumentations) section show how you can use the library for different computer vision tasks: image classification, semantic segmentation, instance segmentation, and object detection, keypoint detection.

The ["Examples"](#examples) section contains Jupyter Notebooks that demonstrate how to use various features of Albumentations. Each notebook includes a link to Google Colab, where you can run the code by yourself.

["API Reference"](#api-reference) contains the description of Albumentations' methods and classes.

## Introduction to image augmentation

- [What is image augmentation and how it can improve the performance of deep neural networks](introduction/image_augmentation.md)
- [Why you need a dedicated library for image augmentation](introduction/why_you_need_a_dedicated_library_for_image_augmentation.md)
- [Why Albumentations](introduction/why_albumentations.md)

## Getting started with Albumentations

- [Installation](getting_started/installation.md)
- [Frequently Asked Questions](faq.md)
- [Image augmentation for classification](getting_started/image_augmentation.md)
- [Mask augmentation for segmentation](getting_started/mask_augmentation.md)
- [Bounding boxes augmentation for object detection](getting_started/bounding_boxes_augmentation.md)
- [Keypoints augmentation](getting_started/keypoints_augmentation.md)
- [Simultaneous augmentation of multiple targets: masks, bounding boxes, keypoints](getting_started/simultaneous_augmentation.md)
- [A list of transforms and their supported targets](getting_started/transforms_and_targets.md)
- [Setting probabilities for transforms in an augmentation pipeline](getting_started/setting_probabilities.md)

## Integrations

- [HuggingFace](integrations/huggingface/)
- [FiftyOne](integrations/fiftyone.md)
- [Roboflow](integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.md)

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
- [Migrating from torchvision to Albumentations](examples/migrating_from_torchvision_to_albumentations/)
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
