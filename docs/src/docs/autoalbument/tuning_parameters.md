# Tuning the search parameters

The `search.yaml` file contains parameters for the search of augmentation policies. Here is an [example `search.yaml`](examples/cifar10.md#searchyaml) for image classification on the CIFAR-10 dataset, and here is an [example `search.yaml`](examples/pascal_voc.md#searchyaml) for semantic segmentation on the Pascal VOC dataset.

## Task-specific model
A task-specific model is a model that classifies images for a classification task or outputs masks for a semantic segmentation task. Settings for a task-specific model are defined by either `classification_model` or `semantic_segmentation_model` depending on a selected task. Ideally, you should select the same model (the same architecture and the same pretrained weights) that you will use in an actual task. AutoAlbument uses models from [PyTorch Image Models](https://github.com/rwightman/pytorch-image-models/) and [Segmentation models](https://github.com/qubvel/segmentation_models.pytorch) packages for classification and semantic segmentation respectively.


## Base PyTorch parameters.

You may want to adjust the following parameters for a PyTorch pipeline:

- `data.dataloader` parameters such as batch_size and `num_workers`
- Number of epochs to search for best augmentation policies in `optim.epochs`.
- Learning rate for optimizers in `optim.main.lr` and `optim.policy.lr`.

## Parameters for the augmentations search.
Those parameters are defined in `policy_model`. You may want to tune the following ones:

- `num_sub_policies` - number of distinct augmentation sub-policies. A random sub-policy is selected in each iteration, and that sub-policy is applied to input data. The larger number of sub-policies will produce a more diverse set of augmentations. On the other side, the more sub-policies you have, the more time and data you need to tune those sub-policies correctly.

- `num_chunks` controls the balance between speed and diversity of augmentations in a search phase. Each batch is split-up into `num_chunks` chunks, and then a random sub-policy is applied to each chunk separately. The larger the value of `num_chunks` helps to learn augmentation policies better but simultaneously increases the searching time. Authors of FasterAutoAugment used such values for `num_chunks` that each chunk consisted of 8 to 16 images.

- `operation_count` - the number of augmentation operations that will be applied to each input data instance. For example, `operation_count: 1` means that only one operation will be applied to an input image/mask, and `operation_count: 4` means that four sequential operations will be applied to each input image/mask. The larger number of operations produces a more diverse set of augmentations but simultaneously increases the searching time.


## Preprocessing transforms
If images have different sizes or you want to train a model on image patches, you could define preprocessing transforms (such as Resizing, Cropping, and Padding) in `data.preprocessing`. Those transforms will always be applied to all input data. Found augmentation policies will also contain those preprocessing transforms.

Note that it is crucial for Policy Model (a model that searches for augmentation parameters) to receive images of the same size that will be used during the training of an actual model. For some augmentations, parameters depend on input data's height and width (for example, hole sizes for the Cutout augmentation).
