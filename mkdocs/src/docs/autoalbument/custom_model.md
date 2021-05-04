# How to use a custom classification or semantic segmentation model

By default AutoAlbument uses [`pytorch-image-models`](https://github.com/rwightman/pytorch-image-models) for classification and [`segmentation_models.pytorch`](https://github.com/qubvel/segmentation_models.pytorch) for semantic segmentation. You can use any model from these packages by providing an appropriate model name.

However, you can also use a custom model with AutoAlbument. To do so, you need to define a Discriminator model. This Discriminator model should have two outputs.

- The first output should provide a prediction for a classification or semantic segmentation task. For classification, it should output a tensor with a shape `[batch_size, num_classes]` with logits. For semantic segmentation, it should output a tensor with the shape `[batch_size, num_classes, height, width]` with logits.

- The second (auxiliary) output should return a tensor with the shape `[batch_size]` that contains logits for Discriminator's predictions (whether Discriminator thinks that an image wasn't or was augmented).

To create such a model, you need to subclass the [`autoalbument.faster_autoaugment.models.BaseDiscriminator`](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/faster_autoaugment/models/main_model.py#L15) class and implement the `forward` method. This method should take a batch of images, that is, a tensor with the shape `[batch_size, num_channels, height, width]`. It should return a tuple that contains tensors from the two outputs described above.

As an example, take a look at how default classification and semantic segmentation models are defined in AutoAlbument - [https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/faster_autoaugment/models/main_model.py](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/faster_autoaugment/models/main_model.py) or explore [an example of a custom model](https://github.com/albumentations-team/autoalbument/blob/master/examples/cifar10/model.py) for the CIFAR10 dataset.

Next, you need to specify this custom model in `config.yaml`, an  AutoAlbument config file.
AutoAlbument uses the [`instantiate` function](https://hydra.cc/docs/next/patterns/instantiate_objects/overview/) from Hydra to instantiate an object. You need to set the `_target_` config variable in the `classification_model` or `semantic_segmentation_model` section, depending on the task. In this config variable, you need to provide a path to a class with the model. This path should be located inside PYTHONPATH, so Hydra could correctly use it. The simplest way is to define your model in a file such as `model.py` and place this file in the same directory with `dataset.py` and `search.yaml` because this directory is automatically added to PYTHONPATH. Next, you could define `_target_` such as `_target_: model.MyClassificationModel`.

Take a look at the [CIFAR10 example config](https://github.com/albumentations-team/autoalbument/blob/master/examples/cifar10/search.yaml#L50) that uses a [custom model defined in model.py](https://github.com/albumentations-team/autoalbument/blob/master/examples/cifar10/model.py#L104) as a starting point for defining a custom model.
