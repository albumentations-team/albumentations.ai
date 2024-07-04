FROM python:3.12

# Create the necessary directory
RUN mkdir /builder

# Install system dependencies required for Python packages with C extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        locales \
        locales-all \
        pandoc \
        build-essential \
        python3-dev \
        libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements.txt at first to leverage Docker cache
COPY ./builder/requirements.txt /builder/requirements.txt

# Upgrade pip and pre-install Cython and wheel to ensure smooth package installations
RUN pip install --upgrade uv && \
    uv pip install --system --upgrade setuptools wheel Cython && \
    uv pip install --system -r /builder/requirements.txt

# Copy the rest of your application
COPY ./builder/entrypoint.sh /builder/entrypoint.sh
COPY ./builder/src /builder/src

# Set PYTHONPATH to include the src directory
ENV PYTHONPATH "${PYTHONPATH}:/builder/src:"

COPY ./google_credentials.json /builder/src/lib/google_credentials.json

# Set the working directory to the src directory
WORKDIR /builder/src

# Specify the entrypoint script
ENTRYPOINT ["/builder/entrypoint.sh"]
