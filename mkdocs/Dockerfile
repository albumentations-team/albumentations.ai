FROM python:3.8.1

RUN mkdir /mkdocs

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    locales \
    locales-all \
    pandoc \
    && rm -rf /var/lib/apt/lists/*

COPY ./mkdocs/requirements.txt /mkdocs/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r /mkdocs/requirements.txt

COPY ./mkdocs/entrypoint.sh /mkdocs/entrypoint.sh
COPY ./mkdocs/src /mkdocs/src

ENV PYTHONPATH "${PYTHONPATH}:/mkdocs/src:"

WORKDIR /mkdocs/src
EXPOSE 8000

ENTRYPOINT ["/mkdocs/entrypoint.sh"]
