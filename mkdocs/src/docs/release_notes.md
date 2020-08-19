# Release notes

## Latest

### Improvements
- Albumentations now explicitly checks that all inputs to augmentations are named arguments and raise an exception otherwise. So if an augmentation receives input like `aug(image)` instead of `aug(image=image)`, Albumentations will raise an exception. PR [#560](https://github.com/albumentations-team/albumentations/pull/560).
- `GaussianBlur` now supports the `sigma` parameter that sets standard deviation for Gaussian kernel. PR [#674](https://github.com/albumentations-team/albumentations/pull/674) and Issue [#673](https://github.com/albumentations-team/albumentations/issues/673).

## 0.4.6

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
