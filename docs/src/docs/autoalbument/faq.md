# FAQ

## Search takes a lot of time. How can I speed it up?

Instead of a full training dataset, you can use a reduced version to search for augmentation policies. For example, the authors of Faster AutoAugment used 6000 images from the 120 selected classes to find augmentation policies for ImageNet (while the full dataset for ILSVRC contains 1.2 million images and 1000 classes).
