# OpenTTD - Docker publish

Publish a Docker image to Docker Hub.

## Usage

```yaml
- uses: openttd/actions/docker-publish@v1
  with:
    # (required) Username to use for registry
    registry-username: ${{ secrets.REGISTRY_USERNAME }}

    # (required) Password to use for registry
    registry-password: ${{ secrets.REGISTRY_PASSWORD }}

    # (required) Name fo the Docker repository to use
    name: ${{ steps.vars.outputs.name }}

    # (required) Main tag of the Docker image
    tag: ${{ steps.vars.outputs.tag }}

    # (optional) Docker registry to use for images
    registry: 'ghcr.io'
```

## Output

- `remote-tag`: Tag (the sha256) of the Docker image as on remote repository
