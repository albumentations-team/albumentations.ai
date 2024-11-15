FROM python:3.12-slim AS development

RUN apt-get update && apt-get install -y python3-pip git wget
RUN pip install --upgrade uv

# Set workspace directory
ENV WORKSPACE_DIR=/workspace
WORKDIR $WORKSPACE_DIR

# Copy scripts first for better caching
COPY ./docs/scripts /workspace/docs/scripts
COPY ./docs/requirements.txt /workspace/docs/requirements.txt

# Make scripts executable
RUN chmod +x /workspace/docs/scripts/*.sh

# Run setup
RUN WORKSPACE_DIR=/workspace /workspace/docs/scripts/setup.sh

# Copy source files
COPY ./docs/src /workspace/docs/src

# Set Python path
ENV PYTHONPATH="${PYTHONPATH}:/workspace/docs/src:/workspace/albumentations"

WORKDIR /workspace/docs/src
EXPOSE 8000

ENTRYPOINT ["/workspace/docs/scripts/build.sh"]

# Production stage
FROM development AS production
ARG GOOGLE_ANALYTICS_ID
ENV GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID \
    JUPYTER_PLATFORM_DIRS=1

RUN /workspace/docs/scripts/build.sh

# Export stage
FROM alpine:latest AS export
WORKDIR /export
COPY --from=production /workspace/docs/src/site/ ./
