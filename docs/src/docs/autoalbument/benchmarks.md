# Benchmarks and a comparison with baseline augmentation strategies

Here is a comparison between a baseline augmentation strategy and an augmentation policy discovered by AutoAlbument
for different classification and semantic segmentation tasks. You can read more about these benchmarks in the [autoalbument-benchmarks](https://github.com/albumentations-team/autoalbument-benchmarks) repository.

## Classification

| Dataset  | Baseline Top-1 Accuracy | AutoAlbument Top-1 Accuracy  |
|----------|:-----------------------:|:----------------------------:|
| [CIFAR10](https://github.com/albumentations-team/autoalbument-benchmarks#cifar-10-classification)  |          91.79          |           **96.02**          |
| [SVHN](https://github.com/albumentations-team/autoalbument-benchmarks#svhn-classification)     |          98.31          |           **98.48**          |
| [ImageNet](https://github.com/albumentations-team/autoalbument-benchmarks#imagenet-classification) |          73.27          |           **75.17**          |


## Semantic segmentation

| Dataset    | Baseline mIOU | AutoAlbument mIOU |
|------------|:-------------:|:-----------------:|
| [Pascal VOC](https://github.com/albumentations-team/autoalbument-benchmarks#pascal-voc-semantic-segmentation) |     73.34     |     **75.55**     |
| [Cityscapes](https://github.com/albumentations-team/autoalbument-benchmarks#cityscapes) |     79.47     |     **79.92**     |
