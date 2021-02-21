# Installation

Albumentations requires Python 3.6 or higher.

## Install the latest stable version from PyPI

``` Bash
pip install -U albumentations
```

## Install the latest version from the master branch on GitHub
``` Bash
pip install -U git+https://github.com/albumentations-team/albumentations
```

### Note on OpenCV dependencies

By default, pip downloads a wheel distribution of Albumentations. This distribution has `opencv-python-headless` as its dependency. However, Albumentations also depends on imgaug, which has `opencv-python` (non-headless-version) as its dependency. Because of this dependency clash, you will get both `opencv-python-headless` and `opencv-python`  installed in your Python environment.

In future versions, we plan to get rid of imgaug as a dependency, and Albumentations will require only `opencv-python-headless` as its dependency.

However, if you need a workaround for the current version, or you already have some OpenCV distribution (such as `opencv-python-headless`, `opencv-python`, `opencv-contrib-python` or `opencv-contrib-python-headless`) installed in your Python environment, you can force Albumentations to use it by providing the `--no-binary imgaug,albumentations` argument to pip, e.g.

```Bash
pip install -U albumentations --no-binary imgaug,albumentations
```

pip will use the following logic to determine the required OpenCV distribution:

1. If your Python environment already contains `opencv-python`, `opencv-contrib-python`, `opencv-contrib-python-headless` or `opencv-python-headless` pip will use it.
2. If your Python environment doesn't contain any OpenCV distribution from step 1, pip will download `opencv-python-headless`.

## Install the latest stable version from conda-forge
If you are using Anaconda or Miniconda you can install Albumentations from conda-forge:

``` Bash
conda install -c conda-forge imgaug
conda install -c conda-forge albumentations
```
