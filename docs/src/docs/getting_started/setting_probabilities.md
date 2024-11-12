# Setting probabilities for transforms in an augmentation pipeline

Each augmentation in Albumentations has a parameter named `p` that sets the probability of applying that augmentation to input data.

The following augmentations have the default value of `p` set 1 (which means that by default they will be applied to each instance of input data): `Compose`, `ReplayCompose`, `CenterCrop`, `Crop`, `CropNonEmptyMaskIfExists`, `FromFloat`, `CenterCrop`, `Crop`, `CropNonEmptyMaskIfExists`, `FromFloat`, `IAACropAndPad`, `Lambda`, `LongestMaxSize`, `Normalize`, `PadIfNeeded`, `RandomCrop`, `RandomCropNearBBox`, `RandomResizedCrop`, `RandomSizedBBoxSafeCrop`, `RandomSizedCrop`, `Resize`, `SmallestMaxSize`, `ToFloat`.

All other augmentations have the default value of `p` set 0.5, which means that by default, they will be applied to 50% of instances of input data.


Let's take a look at the example:

```python
import albumentations as A
import cv2

p1 = 0.95
p2 = 0.85
p3 = 0.75


transform = A.Compose([
    A.RandomRotate90(p=p2),
    A.OneOf([
        A.IAAAdditiveGaussianNoise(p=0.9),
        A.GaussNoise(p=0.6),
    ], p=p3)
], p=p1)

image = cv2.imread('some/image.jpg')
image = cv2.cvtColor(cv2.COLOR_BGR2RGB)

transformed = transform(image=image)
transformed_image = transformed['image']
```

We declare an augmentation pipeline. In this pipeline, we use three placeholder values to set probabilities: `p1`, `p2`, and `p3`. Let's take a closer look at them.

## `p1`

`p1` sets the probability that the augmentation pipeline will apply augmentations at all.

If `p1` is set to 0, then augmentations inside `Compose`
will never be applied to the input image, so the augmentation pipeline will always return the input image unchanged.

If `p1` is set to 1, then all augmentations inside `Compose` will have a chance to be applied. The example above contains two augmentations inside `Compose`: `RandomRotate90` and the `OneOf` block with two child augmentations (more on their probabilities later). Any value of `p1` between 0 and 1 means that augmentations inside `Compose` could be applied with the probability between 0 and 100%.

If `p1` equals to 1 or `p1` is less than 1, but the random generator decides to apply augmentations inside Compose probabilities `p2` and `p3` come into play.


## `p2`

Each augmentation inside `Compose` has a probability of being applied. `p2` sets the probability of applying `RandomRotate90`. In the example above, `p2` equals 0.85, so `RandomRotate90` has an 85% chance to be applied to the input image.

## `p3`

`p3` sets the probability of applying the `OneOf` block. If the random generator decided to apply `RandomRotate90` at the previous step, then `OneOf` will receive data augmented by it. If the random generator decided not to apply `RandomRotate90` then `OneOf` will receive the input data (that was passed to `Compose`) since `RandomRotate90` is skipped.

The `OneOf `block applies one of the augmentations inside it. That means that if the random generator chooses to apply `OneOf` then one child augmentation from it will be applied to the input data.

To decide which augmentation within the `OneOf` block is used, Albumentations uses the following rule:

The `OneOf` block normalizes the probabilities of all augmentations inside it, so their probabilities sum up to 1. Next, `OneOf` chooses one of the augmentations inside it with a chance defined by its normalized probability and applies it to the input data. In the example above `IAAAdditiveGaussianNoise` has probability 0.9 and `GaussNoise` probability 0.6. After normalization, they become 0.6 and 0.4. Which means that `OneOf` will decide that it should use `IAAAdditiveGaussianNoise` with probability 0.6 and `GaussNoise` otherwise.

## Example calculations
Thus, each augmentation in the example above will be applied with the probability:

- `RandomRotate90`: `p1` * `p2`
- `IAAAdditiveGaussianNoise`: `p1` * `p3` * (0.9 / (0.9 + 0.6))
- `GaussianNoise`: `p1` * `p3` * (0.6 / (0.9 + 0.6))
