# OpenTTD - Docker vars

In order to guide the build/publish/deploy process, several variables have to be determined.
This action takes care of that.

## Usage

```yaml
- uses: openttd/actions/docker-vars@v1
  with:
    # (required) Repository on hub.docker.com to use
    repository: ${{ github.repository }}

    # (optional) Username to use for registry (if unset, this will be a dry-run)
    registry-username: ${{ secrets.REGISTRY_USERNAME }}
```

## Output

- `name`: Name of the Docker repository to use
- `version`: Version of the Docker image
- `date`: Date of the Docker image
- `sha`: Sha-hash of the code producing this Docker image
- `tag`: Main tag of the Docker image
- `tags`: List of additional tags of the Docker image
- `enviornment`: Environment this Docker image should be deployed on
- `dry-run`: Is this a dry-run?
