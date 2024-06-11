FROM albumentations/albumentations-ai-mkdocs-base:latest

RUN mkdir /mkdocs
RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations.git /albumentations \
&& pip install -e /albumentations

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations_examples.git /albumentations_examples

RUN git clone --depth=1 --branch master --single-branch https://github.com/albumentations-team/autoalbument.git /autoalbument


COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt

RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r /mkdocs/requirements.txt

COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/replacements.txt /mkdocs/replacements.txt

COPY ./mkdocs/src /mkdocs/src

RUN cp -rf /albumentations_examples/notebooks/*.ipynb /mkdocs/src/docs/examples
COPY ./mkdocs/src/docs/examples /mkdocs/src/docs/examples

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

RUN cp /albumentations/CONTRIBUTING.md /mkdocs/src/docs/

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
