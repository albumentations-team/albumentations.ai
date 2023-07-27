# Frameworks and libraries that use Albumentations

## MMDetection

**https://github.com/open-mmlab/mmdetection**

MMDetection is an open source object detection toolbox based on PyTorch. It is a part of the [OpenMMLab](https://openmmlab.com/) project.

- To install MMDetection with Albumentations follow the [installation instructions](https://github.com/open-mmlab/mmdetection/blob/master/docs/en/get_started.md/#Installation).
- MMDetection has an [example config](https://github.com/open-mmlab/mmdetection/tree/master/configs/albu_example) with augmentations from Albumentations.


## YOLOv5

**https://github.com/ultralytics/yolov5**

YOLOv5 🚀 is a family of object detection architectures and models pretrained on the COCO dataset, and represents [Ultralytics](https://ultralytics.com/) open-source research into future vision AI methods, incorporating lessons learned and best practices evolved over thousands of hours of research and development.

- To use Albumentations along with YOLOv5 simply `pip install -U albumentations` and then update the augmentation pipeline as you see fit in the Albumentations class in `utils/augmentations.py`. [An example](https://github.com/ultralytics/yolov5/pull/3882) is available in the YOLOv5 repository.
