FROM python:3.12-slim

RUN apt-get update && apt-get install -y python3-pip git wget

RUN pip install --upgrade uv

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations.git /albumentations \
&& uv pip install --system -e /albumentations

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations_examples.git /albumentations_examples

RUN git clone --depth=1 --branch master --single-branch https://github.com/albumentations-team/autoalbument.git /autoalbument

RUN mkdir /docs

COPY ./docs/requirements.txt /docs/requirements.txt
COPY ./docs/entrypoint.sh /docs/entrypoint.sh
COPY ./docs/replacements.txt /docs/replacements.txt

COPY ./docs/src /docs/src

RUN uv pip install --system --no-cache-dir -r /docs/requirements.txt

RUN cp -rf /albumentations_examples/notebooks/*.ipynb /docs/src/docs/examples
RUN uv pip install --system torch --index-url https://download.pytorch.org/whl/cpu

COPY ./docs/src/docs/examples /docs/src/docs/examples

### Download HuggingFace
RUN  wget -O /docs/src/docs/integrations/huggingface/image_classification_albumentations.ipynb \
    https://raw.githubusercontent.com/huggingface/notebooks/main/examples/image_classification_albumentations.ipynb

RUN wget -O /docs/src/docs/integrations/huggingface/object_detection.md \
    https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/tasks/object_detection.md \
    && sed -i 's/\[\[open-in-colab\]\]//g' /docs/src/docs/integrations/huggingface/object_detection.md

### Download Roboflow Notebook
RUN wget -O /docs/src/docs/integrations/roboflow/train-rt-detr-on-custom-dataset-with-transformers.ipynb \
    https://raw.githubusercontent.com/roboflow/notebooks/main/notebooks/train-rt-detr-on-custom-dataset-with-transformers.ipynb

ENV PYTHONPATH "${PYTHONPATH}:/docs/src:/albumentations"

RUN cp /albumentations/CONTRIBUTING.md /docs/src/docs/

WORKDIR /docs/src
EXPOSE 8000

ENTRYPOINT ["/docs/entrypoint.sh"]
