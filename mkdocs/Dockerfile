FROM python:3.8.3

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    locales \
    locales-all \
    pandoc \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN ~/.cargo/bin/cargo install fd-find sd && ~/.cargo/bin/cargo install --git https://github.com/lotabout/rargs.git

RUN mkdir /mkdocs

COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r /mkdocs/requirements.txt

RUN git clone --depth=1 https://github.com/albumentations-team/albumentations.git /albumentations
RUN pip install -e /albumentations

COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/replacements.txt /mkdocs/replacements.txt
COPY ./mkdocs/src /mkdocs/src

# Preprocess the source code of Albumentations to deal with mkdocstrings' quirks.
RUN ~/.cargo/bin/rargs -d ' → ' ~/.cargo/bin/sd '{1}' '{2}' $(~/.cargo/bin/fd --full-path /albumentations -e .py) < /mkdocs/replacements.txt

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:/albumentations"

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
