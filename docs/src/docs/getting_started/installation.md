# Installation

Albumentations requires Python 3.8 or higher.

## Install the latest stable version from PyPI

``` Bash
pip install -U albumentations
```

## Install the latest version from the master branch on GitHub

``` Bash
pip install -U git+https://github.com/albumentations-team/albumentations
```

### Note on OpenCV dependencies

By default, pip downloads a wheel distribution of Albumentations. This distribution has `opencv-python-headless` as its dependency.

If you already have some OpenCV distribution (such as `opencv-python-headless`, `opencv-python`, `opencv-contrib-python` or `opencv-contrib-python-headless`) installed in your Python environment, you can force Albumentations to use it by providing the `--no-binary qudida,albumentations` argument to pip, e.g.

```Bash
pip install -U albumentations
```

pip will use the following logic to determine the required OpenCV distribution:

1. If your Python environment already contains `opencv-python`, `opencv-contrib-python`, `opencv-contrib-python-headless` or `opencv-python-headless` pip will use it.
2. If your Python environment doesn't contain any OpenCV distribution from step 1, pip will download `opencv-python-headless`.

## Install the latest stable version from conda-forge

If you are using Anaconda or Miniconda you can install Albumentations from conda-forge:

``` Bash
conda install -c conda-forge albumentations
```
