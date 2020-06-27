# Why Albumentations

### A single interface to work with images, masks, bounding boxes, and key points.
Albumentations provides a single interface to work with different computer vision tasks such as classification, semantic segmentation, instance segmentation, object detection, pose estimation, etc.

### Battle-tested
The library is widely used in [industry](https://albumentations.ai/whos_using#industry), [deep learning research](https://albumentations.ai/whos_using#research), [machine learning competitions](https://albumentations.ai/whos_using#competitions), and [open source projects](https://albumentations.ai/whos_using#open-source).

### High performance
Albumentations optimized for maximum speed and performance. Under the hood, the library uses highly optimized functions from OpenCV and NumPy for data processing. We have a [regularly updated benchmark](https://github.com/albumentations-team/albumentations#benchmarking-results) that compares the speed of popular image augmentations libraries for the most common image transformations. Albumentations demonstrates the best performance in most cases.

### Diverse set of supported augmentations
Albumentations supports more than 60 different image augmentations.

### Extensibility
Albumentations allows to easily add new augmentations and use them in computer vision pipelines through a single interface along with built-in transformations.

### Rigorous testing
Bugs in the augmentation pipeline could silently corrupt the input data. They can easily go unnoticed, but the performance of the models trained with incorrect data will degrade. Albumentations has an extensive test suite that helps to discover bugs during development.

### It is open source and MIT licensed
You can find the source code on [GitHub](https://github.com/albumentations-team/albumentations).
