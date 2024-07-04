# FROM albumentations/albumentations-ai-mkdocs-base:latest
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y python3-pip git


RUN pip install --upgrade uv

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations.git /albumentations \
&& uv pip install --system -e /albumentations

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations_examples.git /albumentations_examples

RUN git clone --depth=1 --branch master --single-branch https://github.com/albumentations-team/autoalbument.git /autoalbument

RUN mkdir /mkdocs

COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt
COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/replacements.txt /mkdocs/replacements.txt

COPY ./mkdocs/src /mkdocs/src

RUN cp -rf /albumentations_examples/notebooks/*.ipynb /mkdocs/src/docs/examples
COPY ./mkdocs/src/docs/examples /mkdocs/src/docs/examples

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

RUN cp /albumentations/CONTRIBUTING.md /mkdocs/src/docs/

RUN uv pip install --system --no-cache-dir -r /mkdocs/requirements.txt

RUN uv pip install --system torch

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
