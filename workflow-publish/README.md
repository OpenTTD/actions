# OpenTTD - Workflow publish

This is a composite action, publishing the staging/production image of a
repository.

## Usage

```yaml
- uses: openttd/actions/workflow-publish@v2
  with:
    # (required) Username to use for registry
    registry-username: ${{ secrets.GHCR_USERNAME }}

    # (required) Password to use for registry
    registry-password: ${{ secrets.GHCR_PASSWORD }}

    # (required) GitHub PAT to use to start deployments
    deployment-token: ${{ secrets.DEPLOYMENT_TOKEN }}

    # (optional) Whether this repository has submodules
    with-submodules: false

    # (optional) Whether this repository has a staging environment
    has-staging: true

    # (optional) Name of the branch used for development
    branch-name: master

    # (optional) Image name to use for registry
    image-name: ${{ github.repository }}
```
