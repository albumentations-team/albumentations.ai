# Metrics and their meaning

During the search phase, AutoAlbument outputs four metrics: `loss`, `d_loss`, `a_loss`, and `Average Parameter Change` (at the end of an epoch).

### a_loss
`a_loss` is a loss for the policy network (or Generator in terms of GAN), which applies augmentations to input images.

### d_loss
`d_loss` is a loss for the Discriminator, the network that tries to guess whether the input image is an augmented or non-augmented one.

### loss
`loss` is a task-specific loss (`CrossEntropyLoss` for classification, `BCEWithLogitsLoss` for semantic segmentation) that acts as a regularizer and prevents the policy network from applying such augmentations that will make an object with class A looks like an object with class B.

### Average Parameter Change
`Average Parameter Change` is a difference between magnitudes of augmentation parameters multiplied by their probabilities at the end of an epoch and the same parameters at the beginning of the epoch. The metric is calculated using the following formula:

![](../images/autoalbument/metrics/avp.svg)


- `m'`  and `m` are magnitude values for the i-th augmentation at the end and the beginning of the epoch, respectively.
- `p'`  and `p` are probability values for the i-th augmentation at the end and the beginning of the epoch, respectively.

The intuition behind this metric is that at the beginning, augmentation parameters are initialized at random, so they are now optimal and prone to heavy change at each epoch. After some time, these parameters should begin to converge, and they should change less at each epoch.


## Examples for metric values

Below are TensorBoard logs for AutoAlbument on different datasets. The search was performed using AutoAlbument configs from the [examples](https://github.com/albumentations-team/autoalbument/tree/master/examples) directory.

- [CIFAR10](https://tensorboard.dev/experiment/ZleMHe73QCGzPeDCRpFLfA/)
- [SVHN](https://tensorboard.dev/experiment/yrm3dwXtQkKvhejiMmXlZw/)
- [ImageNet](https://tensorboard.dev/experiment/raGBBBYVS7K0sveokTO19w/)
- [Pascal VOC](https://tensorboard.dev/experiment/jfbB1GdfR2COLpbfJJNLww/)
- [Cityscapes](https://tensorboard.dev/experiment/Wf8nu5sxRceoHKmf5pDriA/)

As you see, in all these charts, `loss` is slightly decreasing at each epoch, and `a_loss` or `d_loss` could either decrease or increase. `Average Parameter Change` is usually large at first epochs, but then it starts to decrease. As a rule of thumb, to decide whether you should stop AutoAlbument search and use the resulting policy, you should check that `Average Parameter Change` is stopped decreasing and started to oscillate, wait for a few more epochs, and use the found policy from that epoch.

In [autoalbument-benchmaks](https://github.com/albumentations-team/autoalbument-benchmarks), we use AutoAlbument policies produced by the last epoch on these charts.
