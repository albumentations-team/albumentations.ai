FROM python:3.8.1

RUN mkdir /builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        locales \
        locales-all \
        pandoc \
    && rm -rf /var/lib/apt/lists/*

COPY ./builder/requirements.txt /builder/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r /builder/requirements.txt

COPY ./builder/entrypoint.sh /builder/entrypoint.sh
COPY ./builder/src /builder/src

ENV PYTHONPATH "${PYTHONPATH}:/builder/src:"

WORKDIR /builder/src

ENTRYPOINT ["/builder/entrypoint.sh"]
