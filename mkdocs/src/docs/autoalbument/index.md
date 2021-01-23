# AutoAlbument Overview

AutoAlbument is an AutoML tool that learns image augmentation policies from data using the [Faster AutoAugment algorithm](https://arxiv.org/abs/1911.06987). It relieves the user from manually selecting augmentations and tuning their parameters. AutoAlbument provides a complete ready-to-use configuration for an augmentation pipeline.

AutoAlbument supports image classification and semantic segmentation tasks. The library requires Python 3.6 or higher.

The source code and issue tracker are available at [https://github.com/albumentations-team/autoalbument](https://github.com/albumentations-team/autoalbument)


Table of contents:

- [Installation](installation.md)
- [Benchmarks and a comparison with baseline augmentation strategies](benchmarks.md)
- [How to use AutoAlbument](how_to_use.md)
- [How to use an AutoAlbument Docker image](docker.md)
- [How to use a custom classification or semantic segmentation model](custom_model.md)
- [Metrics and their meaning](metrics.md)
- [Tuning parameters](tuning_parameters.md)
- [Examples](examples/list.md)
- [Search algorithms](search_algorithms.md)
- [FAQ](faq.md)
