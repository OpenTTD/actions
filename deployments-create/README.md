# OpenTTD - Create GitHub Deployments

Creates a new GitHub deployment based on the information supplied.

This is the start of a new deployment.
GitHub will emit a 'deployment' event for another workflow to pickup.
This workflow should use the `deployments-update` GitHub Action to update the status of this new deployment.

## Usage

Variables are created by either `docker-vars` (vars) or `docker-publish` (publish).
Although not required, it is highly advised to use those GitHub Actions in combination with this GitHub Action.

```yaml
- uses: openttd/actions/deployments-create@v1
  with:
    # (required) ref that is linked to this deployment; use a SHA-hash
    ref: ${{ steps.vars.outputs.sha }}

    # (required) environment of this deployment
    environment: ${{ steps.vars.outputs.environment }}

    # (required) version of the Docker image
    version: ${{ steps.vars.outputs.version }}

    # (required) date of the Docker image
    date: ${{ steps.vars.outputs.date }}

    # (required) tag of the Docker image as on remote repository
    docker-tag: ${{ steps.publish.outputs.remote-tag }}

    # (required) GitHub Token; cannot be the GITHUB_TOKEN, as that token cannot trigger another workflow
    github-token: ${{ secrets.DEPLOYMENT_TOKEN }}
```
