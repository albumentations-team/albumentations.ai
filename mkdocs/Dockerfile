FROM --platform=linux/amd64 albumentations/albumentations-ai-mkdocs-base:latest

RUN mkdir /mkdocs

COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt

RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r /mkdocs/requirements.txt

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations_examples.git /albumentations_examples

RUN git clone --depth=1 --branch main --single-branch https://github.com/albumentations-team/albumentations.git /albumentations \
&& pip install -e /albumentations

# Copy entire mkdocs/src after ensuring CONTRIBUTING.md is already there
COPY ./mkdocs/src /mkdocs/src
# Ensure the directory exists before copying anything into it
RUN mkdir -p /mkdocs/src/docs/

# The rest remains unchanged
COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/replacements.txt /mkdocs/replacements.txt
RUN cp -rf /albumentations_examples/notebooks/*.ipynb /mkdocs/src/docs/examples
COPY ./mkdocs/src/docs/examples /mkdocs/src/docs/examples

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

# Now copy the CONTRIBUTING.md to ensure it's there before copying the whole /mkdocs/src
RUN cp /albumentations/CONTRIBUTING.md /mkdocs/src/docs/

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
