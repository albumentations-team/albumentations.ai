FROM albumentations/albumentations-ai-mkdocs-base:latest

RUN mkdir /mkdocs

COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt
RUN pip install --no-cache-dir -r /mkdocs/requirements.txt

RUN git clone --depth=1 https://github.com/albumentations-team/albumentations.git /albumentations
RUN pip install -e /albumentations

COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/replacements.txt /mkdocs/replacements.txt
COPY ./mkdocs/src /mkdocs/src

# Preprocess the source code of Albumentations to deal with mkdocstrings' quirks.
RUN ~/.cargo/bin/rargs -d ' → ' ~/.cargo/bin/sd '{1}' '{2}' $(~/.cargo/bin/fd --full-path /albumentations -e .py) < /mkdocs/replacements.txt

RUN git clone --depth=1 https://github.com/albumentations-team/albumentations_examples.git /albumentations_examples
RUN cp -rf /albumentations_examples/notebooks/*.ipynb /mkdocs/src/docs/examples

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
