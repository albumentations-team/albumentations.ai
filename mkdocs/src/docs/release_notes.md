# Release notes

## Albumentations 1.4.3 Release Notes

- Request
- Highlights
- New transform
- Minor improvements and bug fixes

## Request

1. If you enjoy using the library as an individual developer or a company representative, please consider becoming a [sponsor for the library](https://github.com/sponsors/albumentations-team). Every dollar helps.
2. If you did not give our repo a ⭐, it is [only one mouse click](https://github.com/albumentations-team/albumentations)
3. If you have feature requests or proposals or encounter issues - submit your request to [issues](https://github.com/albumentations-team/albumentations/issues) or ask in [Discord server for Albumentations](https://discord.gg/AmMnDBdzYs)

## New transform

<img width="1659" alt="Screenshot 2024-04-02 at 18 43 51" src="https://github.com/albumentations-team/albumentations/assets/5481618/e9c95aab-b2a8-4b12-9d72-86041b08f3ed">

- Added `Morphological` transform that modifies the structure of the image. Dilation expands the white (foreground) regions in a binary or grayscale image, while erosion shrinks them.

## Minor improvements and bug fixes

- Updated benchmark for uint8 images, processed on CPU. Added Kornia and Augly. [LINK](https://albumentations.ai/docs/benchmarking_results/) by @ternaus
- Bugfix in [FDA](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/?h=fda#albumentations.augmentations.domain_adaptation.FDA) transform by @ternaus
- Now [RandomSizedCrop](https://albumentations.ai/docs/api_reference/full_reference/?h=randomsizedcrop#albumentations.augmentations.crops.transforms.RandomSizedCrop) supports the same signature as analogous transform in torchvision by @zetyquickly

## Albumentations 1.4.2 Release Notes

- Request
- Highlights
- New transform
- New functionality
- Improvements and bug fixes

## Request

1. If you enjoy using the library as an individual developer or as a representative of the company please consider becoming a [sponsor for the library](https://github.com/sponsors/albumentations-team). Every dollar helps.
2. If you did not give our repo a ⭐, it is [only one mouse click](https://github.com/albumentations-team/albumentations)
3. If you have feature requests or proposals or encounter issues - submit your request to [issues](https://github.com/albumentations-team/albumentations/issues) or ask in [Discord server for Albumentations](https://discord.gg/AmMnDBdzYs)

## New transform

<div align="center">
  <a href="https://i.imgur.com/8wWkMmL.jpeg">
    <img src="https://i.imgur.com/8wWkMmL.jpeg" width="30%">
  </a>
  <a href="https://i.imgur.com/B687Opr.jpeg">
    <img src="https://i.imgur.com/B687Opr.jpeg" width="30%">
  </a>
  <a href="https://i.imgur.com/jkjwFMB.jpeg">
    <img src="https://i.imgur.com/jkjwFMB.jpeg" width="30%">
  </a>
  <p>
    <b>Left:</b> Original, <b>Middle:</b> Chromatic aberration (default args, mode="green_purple"), <b>Right:</b>  Chromatic aberration (default args, mode="red_blue")
    <br>(Image is from our internal mobile mapping dataset)
  </p>
</div>

* Added `ChromaticAbberation` transform that adds chromatic distortion to the image. [Wiki](https://en.wikipedia.org/wiki/Chromatic_aberration) by @mrsmrynk

## New functionality

* Return `mixing parameter` for `MixUp` transform by @Dipet. For more details [Tutorial on MixUp](https://albumentations.ai/docs/examples/example_mixup/)

## Improvements and Bugfixes

* Do not throw deprecation warning when people do not use deprecated parameters in `AdvancedBlur` by @Aloqeely
* Updated `CONTRIBUTORS.md` for Windows users by @Aloqeely
* Fixed Docstring for `DownScale` transform by @ryoryon66
* Bugfix in `PadIfNeeded` serialization @ternaus

## Albumentations 1.4.1 Release Notes (4 March 2024)

- Request
- Highlights
- New transform
- Improvements
- Bug fixes

## Request

1. If you enjoy using the library as an individual developer or during the day job as a part of the company, please consider becoming a [sponsor for the library](https://github.com/sponsors/albumentations-team). Every dollar helps.
2. If you did not give our repo a ⭐, it is [only one mouse click](https://github.com/albumentations-team/albumentations)
3. If you have feature requests or proposals or encounter issues - submit your request to [issues](https://github.com/albumentations-team/albumentations/issues) or our new initiative, - [Discord server for albumentations](https://discord.gg/AmMnDBdzYs)

## New transform

<img width="660" alt="Screenshot 2024-03-04 at 14 52 15" src="https://github.com/albumentations-team/albumentations/assets/5481618/68e5031b-e45e-4578-abe8-1d8e33db4831">

* Added `MixUp` transform: which linearly combines an input (image, mask, and class label) with another set from a predefined reference dataset. The mixing degree is controlled by a parameter λ (lambda), sampled from a Beta distribution. This method is known for improving model generalization by promoting linear behavior between classes and smoothing decision boundaries.

## Minor changes and Bug Fixes
* Moved from `isort`, `flake8`, `black` to `ruff`
* Added extra checks for docstrings to match Google Style.
* Updated [Who's using](https://albumentations.ai/whos_using)
* Removed quidda dependency, which addresses `opencv` library inconsistencies issues
* New, updated version of [benchmark](https://github.com/albumentations-team/albumentations?tab=readme-ov-file#benchmarking-results).

## Albumentations 1.4.0 Release Notes (17 February 2024)

- Request
- Highlights
- New transform
- Backwards Incompatible Changes
- Improvements
- Bug fixes

## Request
1. If you enjoy using the library as an individual developer or during the day job as a part of the company, please consider becoming a [sponsor for the library](https://github.com/sponsors/albumentations-team). Every dollar helps.
2. If you did not give our repo a ⭐, it is [only one mouse click].(https://github.com/albumentations-team/albumentations)
3. If you have feature requests, proposals, or encounter issues - submit your request to [issues](https://github.com/albumentations-team/albumentations/issues) or, our new initiative, - [Discord server for albumentations](https://discord.gg/AmMnDBdzYs)

## Highlights

In this release, we mainly focused on the technical debt as its decrease allows faster iterations and bug fixes in the codebase. We added only one new transform, did not work on speeding up transforms, and other changes are minor.

1. We are removing the dependency on the imgaug library. The library was one of our inspirations when we created Albumentations, but maintainers of imgaug ceased its support which caused inconsistencies in library versions. It was done in 2021, say commit https://github.com/albumentations-team/albumentations/commit/ba44effb0369ba5eae1e8eb4909105eac9709230 by @Dipet .

But, somehow, we are cutting this dependency only in 2024.

2. Added typing in all of the codebase. When we started the library, Python 2 was still widely used; hence, none of the original codebases had types specified for function arguments and return types. Since the end of the support for Python 2, we added types to the new or updated code, but only now have we covered all the codebase.

## New transform

<img width="560" alt="Screenshot 2024-02-17 at 13 09 01" src="https://github.com/albumentations-team/albumentations/assets/5481618/18aaebad-4b58-4cc6-932f-e2d8a1f352ab">

* Added `XYMasking` transform: applies masking strips to an image, either horizontally (X axis) or vertically (Y axis), simulating occlusions. This transform is helpful for training models to recognize images with varied visibility conditions. It's particularly effective for spectrogram images, allowing spectral and frequency masking to improve model robustness.
As other dropout transforms [CoarseDropout](https://albumentations.ai/docs/api_reference/augmentations/dropout/coarse_dropout/), [MaskDropout](https://albumentations.ai/docs/api_reference/augmentations/dropout/mask_dropout/), [GridDropout](https://albumentations.ai/docs/api_reference/augmentations/dropout/grid_dropout/) it supports images, masks and keypoints as targets. (https://github.com/albumentations-team/albumentations/commit/004fabbf90794fbc21ee356e2dde6637b7fecbd4 by @ternaus )

## Backward Incompatible Changes
The deprecated code, including 15 transforms, was removed.
Dependency on the [imgaug](https://imgaug.readthedocs.io/en/latest/) library was removed.

(https://github.com/albumentations-team/albumentations/commit/be6a217b207b3d7ebe792caabb438d660b45f2a5 by @ternaus )

### Deleted Transforms
1. `JpegCompression`. Use [ImageCompression](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.ImageCompression) instead.
2. `RandomBrightness`. Use [RandomBrigtnessContrast](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.RandomBrightnessContrast) instead.
3. `RandomContrast`. Use [RandomBrigtnessContrast](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.RandomBrightnessContrast) instead.
4. `Cutout`. Use [CoarseDropout](https://albumentations.ai/docs/api_reference/augmentations/dropout/coarse_dropout/#coarsedropout-augmentation-augmentationsdropoutcoarse_dropout) instead.
5. `ToTensor`. Use [ToTensorV2](https://albumentations.ai/docs/api_reference/pytorch/transforms/#albumentations.pytorch.transforms.ToTensorV2) instead.
6. `IAAAdditiveGaussianNoise`. Use [GaussNoise](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.GaussNoise) instead.
7. `IAAAffine`. Use [Affine](https://albumentations.ai/docs/api_reference/augmentations/geometric/transforms/#albumentations.augmentations.geometric.transforms.Affine) instead.
8. IAACropAndPad. Use [CropAndPad](https://albumentations.ai/docs/api_reference/augmentations/crops/transforms/#albumentations.augmentations.crops.transforms.CropAndPad) instead.
9. `IAAEmboss`. Use [Emboss](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.Emboss) instead.
10. `IAAFliplr`. Use [HorizontalFlip](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.HorizontalFlip) instead.
11. `IAAFlipud`. Use [VerticalFlip](https://albumentations.ai/docs/api_reference/full_reference/#albumentations.augmentations.geometric.transforms.VerticalFlip) instead.
12. `IAAPerspective`. Use [Perspective](https://albumentations.ai/docs/api_reference/augmentations/geometric/transforms/#albumentations.augmentations.geometric.transforms.Perspective) instead.
13. `IAAPiecewiseAffine`. Use [PiecewiseAffine](https://albumentations.ai/docs/api_reference/augmentations/geometric/transforms/#albumentations.augmentations.geometric.transforms.PiecewiseAffine) instead.
14. `IAASharpen`. Use [Sharpen](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.Sharpen) instead.
15. `IAASuperpixels`. Use [Superpixels](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.Superpixels) instead.

### Other deprecated functionality
* Removed  `eps` parameter in [RandomGamma](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.RandomGamma)
* Removed `lambda_transforms`in `serialization.from_dict` function.

 ## Minor changes and Bug Fixes
 * Added details [Contributor's guide](https://github.com/albumentations-team/albumentations/blob/main/CONTRIBUTING.md)
 * Added support for `matrix=None` case for Piecewise affine transform (https://github.com/albumentations-team/albumentations/commit/c70e664e060bfd7463c20674927aed217f72d437 @Dipet )
 * Bugfix - Eliminated the possibility of the Perspective transform collapsing (https://github.com/albumentations-team/albumentations/commit/a919a772d763e0c62b674ca490a97c89e0b9c5a3 @alicangok )
 * Fixes in docstrings (@domef, @aaronzs, @Dipet, @ternaus  )
 * Added checks for python 3.12

## 0.5.2 (29 November 2020)

### Minor changes
- [ToTensorV2](https://albumentations.ai/docs/api_reference/pytorch/transforms/#albumentations.pytorch.transforms.ToTensorV2) now automatically expands grayscale images with the shape `[H, W]` to the shape `[H, W, 1]`. PR [#604](https://github.com/albumentations-team/albumentations/pull/604) by [@Ingwar](https://github.com/Ingwar).
- [CropNonEmptyMaskIfExists ](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.CropNonEmptyMaskIfExists) now also works with multiple masks that are provided by the `masks` argument to the transform function. Previously this augmentation worked only with a single mask provided by the `mask` argument. PR [#761](https://github.com/albumentations-team/albumentations/pull/761).

## 0.5.1 (2 November 2020)

### Breaking changes
- API for [`A.FDA`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.FDA) is changed to resemble API of [`A.HistogramMatching`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.HistogramMatching). Now, both transformations expect to receive a list of reference images, a function to read those image, and additional augmentation parameters. [(#734)](https://github.com/albumentations-team/albumentations/pull/734)
- [`A.HistogramMatching`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.HistogramMatching) now uses`read_rgb_image` as a default `read_fn`. This function reads an image from the disk as an RGB NumPy array. Previously, the default `read_fn` was `cv2.imread` which read an image as a BGR NumPy array. [(#734)](https://github.com/albumentations-team/albumentations/pull/734)

### New transformations
- [`A.Sequential`](https://albumentations.ai/docs/api_reference/core/composition/#albumentations.core.composition.Sequential) transform that can apply augmentations in a sequence. This transform is not intended to be a replacement for `A.Compose`. Instead, it should be used inside `A.Compose` the same way `A.OneOf` or `A.OneOrOther`. For instance, you can combine `A.OneOf` with `A.Sequential` to create an augmentation pipeline containing multiple sequences of augmentations and apply one randomly chosen sequence to input data. [(#735)](https://github.com/albumentations-team/albumentations/pull/735)


### Minor changes
- [`A.ShiftScaleRotate`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.ShiftScaleRotate) now has two additional optional parameters: `shift_limit_x` and `shift_limit_y`. If either of those parameters (or both of them) is set `A.ShiftScaleRotate` will use the set values to shift images on the respective axis. [(#735)](https://github.com/albumentations-team/albumentations/pull/735)
- [`A.ToTensorV2`](https://albumentations.ai/docs/api_reference/pytorch/transforms/#albumentations.pytorch.transforms.ToTensorV2) now supports an additional argument `transpose_mask` (`False` by default). If the argument is set to `True` and an input mask has 3 dimensions, `A.ToTensorV2` will transpose dimensions of a mask tensor in addition to transposing dimensions of an image tensor. [(#735)](https://github.com/albumentations-team/albumentations/pull/735)

### Bugfixes
-  [`A.FDA`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.FDA) now correctly uses coordinates of the center of an image. [(#730)](https://github.com/albumentations-team/albumentations/pull/730)
- Fixed problems with grayscale images for [`A.HistogramMatching`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.HistogramMatching). [(#734)](https://github.com/albumentations-team/albumentations/pull/734)
- Fixed a bug that led to an exception when `A.load()` was called to deserialize a pipeline that contained `A.ToTensor` or `A.ToTensorV2`, but those transforms were not imported in the code before the call. [(#735)](https://github.com/albumentations-team/albumentations/pull/735)

## 0.5.0 (19 October 2020)

### Breaking changes
- Albumentations now explicitly checks that all inputs to augmentations are named arguments and raise an exception otherwise. So if an augmentation receives input like aug(image) instead of aug(image=image), Albumentations will raise an exception. ([#560](https://github.com/albumentations-team/albumentations/pull/560))
- Dropped support of Python 3.5 ([#709](https://github.com/albumentations-team/albumentations/pull/709))
- Keypoints and bboxes are checked for visibility after each transform ([#566](https://github.com/albumentations-team/albumentations/pull/566))

### New transformations
- [`A.FDA`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.FDA) transform for Fourier-based domain adaptation. ([#685](https://github.com/albumentations-team/albumentations/pull/685))
- [`A.HistogramMatching`](https://albumentations.ai/docs/api_reference/augmentations/domain_adaptation/#albumentations.augmentations.domain_adaptation.HistogramMatching) transform that applies histogram matching. ([#708](https://github.com/albumentations-team/albumentations/pull/708))
- [`A.ColorJitter`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.ColorJitter) transform that behaves similarly to `ColorJitter` from torchvision (though there are some minor differences due to different internal logic for working with HSV colorspace in Pillow, which is used in torchvision and OpenCV, which is used in Albumentations). ([#705](https://github.com/albumentations-team/albumentations/pull/705))

### Minor changes
- [`A.PadIfNeeded`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.PadIfNeeded) now accepts additional `pad_width_divisor`, `pad_height_divisor` (`None` by default) to ensure image has width & height that is dividable by given values. ([#700](https://github.com/albumentations-team/albumentations/pull/700))
- Added support to apply [`A.CoarseDropout`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.CoarseDropout) to masks via `mask_fill_value`. ([#699](https://github.com/albumentations-team/albumentations/pull/699))
- [`A.GaussianBlur`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.GaussianBlur) now supports the sigma parameter that sets standard deviation for Gaussian kernel. ([#674](https://github.com/albumentations-team/albumentations/pull/674), [#673](https://github.com/albumentations-team/albumentations/issues/673)) .

### Bugfixes
- Fixed bugs in [`A.HueSaturationValue`](https://albumentations.ai/docs/api_reference/augmentations/transforms/#albumentations.augmentations.transforms.HueSaturationValue) for float dtype. ([#696](https://github.com/albumentations-team/albumentations/pull/696), [#710](https://github.com/albumentations-team/albumentations/pull/710))
- Fixed incorrect rounding error on bboxes in `YOLO` format. ([#688](https://github.com/albumentations-team/albumentations/pull/688))


## 0.4.6 (19 July 2020)

### Improvements
- Change the ImgAug dependency version from “imgaug>=0.2.5,<0.2.7” to “imgaug>=0.4.0". Now Albumentations won’t downgrade your existing ImgAug installation to the old version. PR [#658](https://github.com/albumentations-team/albumentations/pull/658).
- Do not try to resize an image if it already has the required height and width. That eliminates the redundant call to the OpenCV function that requires additional copying of the input data. PR [#639](https://github.com/albumentations-team/albumentations/pull/639).
`ReplayCompose` is now serializable. PR [#623](https://github.com/albumentations-team/albumentations/pull/623) by [IlyaOvodov](https://github.com/IlyaOvodov)
- Documentation fixes and updates.

### Bug Fixes
- Fix a bug that causes some keypoints and bounding boxes to lie outside the visible part of the augmented image if an augmentation pipeline contained augmentations that increase the height and width of an image (such as `PadIfNeeded`). That happened because Albumentations checked which bounding boxes and keypoints lie outside the image only after applying all augmentations. Now Albumentations will check and remove keypoints and bounding boxes that lie outside the image after each augmentation. If, for some reason, you need the old behavior, pass `check_each_transform=False` in your `KeypointParams` or `BboxParams`. Issue [#565](https://github.com/albumentations-team/albumentations/issues/565) and PR [#566](https://github.com/albumentations-team/albumentations/pull/566).
- Fix a bug that causes an exception when Albumentations received images with the number of color channels that are even but are not multiples of 4 (such as 6, 10, etc.). PR [#638](https://github.com/albumentations-team/albumentations/pull/638).
- Fix the off-by-one error in applying steps for GridDistortion. Commit [9c225a9](https://github.com/albumentations-team/albumentations/commit/9c225a99a379594098dbea2a077fd22da684ade9)
- Fix bugs that prevent serialization of `ImageCompression` and `GaussNoise`. PR [#569](https://github.com/albumentations-team/albumentations/pull/569)
- Fix a bug that causes errors with some values for `label_fields` in `BboxParams`. PR [#504](https://github.com/albumentations-team/albumentations/pull/504) by [IlyaOvodov](https://github.com/IlyaOvodov)
- Fix a bug that prevents HueSaturationValue for working with grayscale images. PR [#500](https://github.com/albumentations-team/albumentations/pull/500).
