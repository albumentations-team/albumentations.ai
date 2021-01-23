# How to use an AutoAlbument Docker image

You can run AutoAlbument from a Docker image. The `ghcr.io/albumentations-team/autoalbument:latest` Docker image contains the latest release version of AutoAlbument.

You can also use an image that contains a specific version of AutoAlbument. In that case, you need to use the AutoAlbument version as a tag for a Docker image, e.g., the `ghcr.io/albumentations-team/autoalbument:0.3.0` image contains AutoAlbument 0.3.0.

The latest AutoAlbument image is based on the [`pytorch/pytorch:1.7.0-cuda11.0-cudnn8-runtime`](https://hub.docker.com/layers/pytorch/pytorch/1.7.0-cuda11.0-cudnn8-runtime/images/sha256-9cffbe6c391a0dbfa2a305be24b9707f87595e832b444c2bde52f0ea183192f1?context=explore) image.

When you run a Docker container with AutoAlbument, you need to mount a config directory (a directory containing `dataset.py` and `search.yaml` files) and other required directories, such as a directory that contains training data.

Here is an example command that runs a Docker container that will search for CIFAR10 augmentation policies.

`docker run -it --rm --gpus all --ipc=host -v ~/projects/autoalbument/examples/cifar10:/config -v ~/data:/home/autoalbument/data -u $(id -u ${USER}):$(id -g ${USER}) ghcr.io/albumentations-team/autoalbument:latest`

Let's take a look at the arguments:

- `--it`. Tell Docker that you run an interactive process. [Read more](https://docs.docker.com/engine/reference/run/#foreground) in the Docker documentation.
- `--rm`. Automatically clean up a container when it exits. [Read more](https://docs.docker.com/engine/reference/run/#clean-up---rm) in the Docker documentation.
- `--gpus all`. Specify GPUs to use. [Read more](https://docs.docker.com/engine/reference/commandline/run/#access-an-nvidia-gpu) in the Docker documentation.
- `--ipc=host`. Increase shared memory size for PyTorch DataLoader. [Read more](https://github.com/pytorch/pytorch#using-pre-built-images
) in the PyTorch documentation.
- `-v ~/projects/autoalbument/examples/cifar10:/config`. Mounts the `~/projects/autoalbument/examples/cifar10` directory from the host to the `/config` directory into the container. This example assumes that you have the [AutoAlbument repository](https://github.com/albumentations-team/autoalbument) in the `~/projects/autoalbument/` directory. Generally speaking, you need to mount a directory containing `dataset.py` and `search.yaml` into the `/config` directory in a container.
- `-v ~/data:/home/autoalbument/data`. Mounts the directory `~/data` that contains the CIFAR10 dataset into the `/home/autoalbument/data` directory. You can mount a host directory with a dataset into any container directory, but you need to specify config parameters accordingly. In this example, we mount the directory into `/home/autoalbument/data` because [we set this directory (`~/data/cifar10`) in the config as a root directory for the dataset](https://github.com/albumentations-team/autoalbument/blob/master/examples/cifar10/search.yaml#L91). Note that Docker doesn't support tilde expansion for the HOME directory, so we explicitly name HOME directory as `/home/autoalbument` because `autoalbument` is a default user inside the container.
- `-u $(id -u ${USER}):$(id -g ${USER})`. We use that command to tell Docker to use the host's user ID to run code inside a container. We need this command because AutoAlbument will produce artifacts in the config directory (such as augmentation configs and logs). We need that the host user owns those files (and not `root`, for example) so you can access them afterward.
- `ghcr.io/albumentations-team/autoalbument:latest` is the Docker image's name. `latest` is a tag for the latest stable release. Alternatively, you can use a tag that specifies an AutoAlbument version, e.g., `ghcr.io/albumentations-team/autoalbument:0.3.0`.
