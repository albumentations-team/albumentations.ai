FROM python:3.12-slim

RUN apt-get update && apt-get install -y python3-pip git wget

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

RUN uv pip install --system --no-cache-dir -r /mkdocs/requirements.txt

RUN cp -rf /albumentations_examples/notebooks/*.ipynb /mkdocs/src/docs/examples
RUN uv pip install --system torch --index-url https://download.pytorch.org/whl/cpu

COPY ./mkdocs/src/docs/examples /mkdocs/src/docs/examples

### Download HuggingFace
RUN  wget -O /mkdocs/src/docs/integrations/huggingface/image_classification_albumentations.ipynb \
    https://raw.githubusercontent.com/huggingface/notebooks/main/examples/image_classification_albumentations.ipynb

RUN wget -O /mkdocs/src/docs/integrations/huggingface/object_detection.md \
    https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/tasks/object_detection.md \
    && sed -i 's/\[\[open-in-colab\]\]//g' /mkdocs/src/docs/integrations/huggingface/object_detection.md

### Download Roboflow Notebook
RUN wget -O /mkdocs/src/docs/integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.ipynb \
    https://raw.githubusercontent.com/roboflow/notebooks/main/notebooks/train-rt-detr-on-custom-dataset-with-transformers.ipynb

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

RUN cp /albumentations/CONTRIBUTING.md /mkdocs/src/docs/

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
