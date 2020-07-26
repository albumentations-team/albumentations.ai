# Overview

Albumentations Experimental provides experimental and cutting edge augmentation techniques on top of the Albumentations library. The source code is available at [https://github.com/albumentations-team/albumentations_experimental](https://github.com/albumentations-team/albumentations_experimental).

## Why a separate library

Albumentations provides stable and well-tested interfaces for performing augmentations. We don't want to pollute the library with features that may be prone to rapid changes in interfaces and behavior since they could break users' pipelines. But we also want to implement new, experimental features and see whether they will be useful.

So we created Albumentations Experimental, a library that will help us to iterate faster and remove the need for striving for backward compatibility and rigorous testing.

Beware, that each new version of Albumentations Experimental may contain backward-incompatible changes both in interfaces and behavior.

When features in Albumentations Experimental are mature enough, we will port them to the main library with all our usual policies such as rigorous testing, extensive documentation, and stable behavior.

## Documentation

- API Reference
    - [Transforms (albumentations_experimental.augmentations.transforms)](api_reference/augmentations/transforms.md)
