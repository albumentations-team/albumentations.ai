FROM python:3.12-slim AS development

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --upgrade uv

# Set workspace directory and environment variables
ENV WORKSPACE_DIR=/workspace \
    DOCS_DIR=/workspace/docs \
    ALBUMENTATIONS_DIR=/workspace/albumentations \
    JUPYTER_PLATFORM_DIRS=1

WORKDIR $WORKSPACE_DIR

# Copy requirements first for better caching
COPY ./docs/requirements.txt $DOCS_DIR/
COPY ./docs/scripts $DOCS_DIR/scripts/

# Make scripts executable
RUN chmod +x $DOCS_DIR/scripts/*.sh

# Run setup
RUN $DOCS_DIR/scripts/setup.sh

# Copy source files
COPY ./docs/src $DOCS_DIR/src/

# Set Python path
ENV PYTHONPATH="$DOCS_DIR/src:$ALBUMENTATIONS_DIR/tools:${PYTHONPATH:-}"

WORKDIR $DOCS_DIR/src
EXPOSE 8000

CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]

# Production stage
FROM development AS production
ARG GOOGLE_ANALYTICS_ID
ENV GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID

RUN $DOCS_DIR/scripts/download_notebooks.sh && \
    $DOCS_DIR/scripts/build.sh

# Export stage
FROM scratch AS export
COPY --from=production /workspace/docs/src/site/ .
