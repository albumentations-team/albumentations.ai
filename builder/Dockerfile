FROM python:3.8

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
RUN pip install --no-cache-dir --upgrade pip setuptools wheel Cython && \
    pip install --no-cache-dir -r /builder/requirements.txt

# Copy the rest of your application
COPY ./builder/entrypoint.sh /builder/entrypoint.sh
COPY ./builder/src /builder/src

# Set PYTHONPATH to include the src directory
ENV PYTHONPATH "${PYTHONPATH}:/builder/src:"

# Set the working directory to the src directory
WORKDIR /builder/src

# Specify the entrypoint script
ENTRYPOINT ["/builder/entrypoint.sh"]
