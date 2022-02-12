# OpenTTD - Docker build

Builds the Dockerfile in the root directory to an image.

## Usage

```yaml
- uses: openttd/actions/docker-build@v2
  with:
    # (required) name of the Docker repository to use
    name: ${{ steps.vars.outputs.name }}

    # (required) main tag of the docker image
    tag: ${{ steps.vars.outputs.tag }}

    # (required) list of additional tags of the Docker image (space as seperator)
    tags: ${{ steps.vars.outputs.tags }}

    # (required) version of the Docker image (given to the Dockerfile as build-argument)
    version: ${{ steps.vars.outputs.version }}

    # (required) date of the Docker image (given to the Dockerfile as build-argument)
    date: ${{ steps.vars.outputs.date }}

    # (optional) platform to build the Docker image for
    platform: linux/amd64,linux/arm64

    # (optional) Docker registry to use for images
    registry: 'ghcr.io'
```
