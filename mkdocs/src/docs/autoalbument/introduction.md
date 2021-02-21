# AutoAlbument introduction and core concepts

## What is AutoAlbument

AutoAlbument is a tool that automatically searches for the best augmentation policies for your data.

Under the hood, it uses the [Faster AutoAugment algorithm](https://arxiv.org/abs/1911.06987). Briefly speaking, the idea is to use a GAN-like architecture in which Generator applies augmentation to some input images, and Discriminator must determine whether an image was or wasn't augmented. This process helps to find augmentation policies that will produce images similar to the original images.

## How to use AutoAlbument

To use AutoAlbument, you need to define two things: a PyTorch Dataset for your data and configuration parameters for AutoAlbument. You can read the detailed instruction in the [How to use AutoAlbument](https://albumentations.ai/docs/autoalbument/how_to_use/) article.

Internally AutoAlbument uses [PyTorch Lightning](https://www.pytorchlightning.ai/) for training a GAN and [Hydra](https://hydra.cc/) for handling configuration parameters.

Here are a few things about AutoAlbument and Hydra.

### Hydra

The main internal configuration file is located at [autoalbument/cli/conf/config.yaml](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/cli/conf/config.yaml)

Here is its content:

```
defaults:
 - _version
 - task
 - policy_model: default
 - classification_model: default
 - semantic_segmentation_model: default
 - data: default
 - searcher: default
 - trainer: default
 - optim: default
 - callbacks: default
 - logger: default
 - hydra: default
 - seed
 - search
```

Basically, it includes a bunch of config files with default values. Those config files are split into sets of closely related parameters such as model parameters or optimizer parameters. All default config files are located in their respective directories inside [autoalbument/cli/conf](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/cli/conf)

The main config file also includes the `search.yaml` file, which you will use for overriding default parameters for your specific dataset and task (you can read more about creating the `search.yaml` file with `autoalbument-create` in [How to use AutoAlbument](how_to_use.md))

To allow great flexibility, AutoAlbument relies heavily on the [`instantiate` function](https://hydra.cc/docs/patterns/instantiate_objects/overview) from Hydra. This function allows to define a path to a Python class in a YAML config (using the `_target_` parameter) along with arguments to that class, and Hydra will create an instance of this class with the provided arguments.

As a practice example, if a config contains a definition like this:

```
_target_: autoalbument.faster_autoaugment.models.ClassificationModel
num_classes: 10
architecture: resnet18
pretrained: False
```

AutoAlbument will translate it approximately to the following call:

```
from autoalbument.faster_autoaugment.models import ClassificationModel

model = ClassificationModel(num_classes=10, architecture='resnet18', pretrained=False)
```

By relying on this feature, AutoAlbument allows customizing its behavior without changing the library's internal code.

### PyTorch Lightning

AutoAlbument relies on PyTorch Lightning to train a GAN. In AutoAlbument configs, you can configure PyTorch Lightning by passing the appropriate arguments to [Trainer](https://pytorch-lightning.readthedocs.io/en/stable/common/trainer.html) through the [`trainer` config](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/cli/conf/trainer/default.yaml) or defining a list of [Callbacks](https://pytorch-lightning.readthedocs.io/en/stable/extensions/callbacks.html) through the [`callbacks` config](https://github.com/albumentations-team/autoalbument/blob/master/autoalbument/cli/conf/callbacks/default.yaml).
