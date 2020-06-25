# Contributing

All development is done on GitHub: [https://github.com/albumentations-team/albumentations](https://github.com/albumentations-team/albumentations)

If you find a bug or have a feature request file an issue at [https://github.com/albumentations-team/albumentations/issues](https://github.com/albumentations-team/albumentations)

To create a pull request:

1.  Fork the repository.
2.  Clone the repository locally.
3.  Install `pre-commit` (a library for running pre-commit hooks), `black` (code formatter) and `flake8` (code linter):
``` base
pip install pre-commit black flake8
```
4.  Initialize `pre-commit`:
``` bash
pre-commit install
```
5.  Install `albumentations` in development mode:
``` bash
pip install -e .[tests]
```
6.  Make changes to the code.
7.  Run tests:
``` bash
pytest
```
8.  Push the code to your forked repo.
9.  Create a pull request to [https://github.com/albumentations-team/albumentations](https://github.com/albumentations-team/albumentations)
