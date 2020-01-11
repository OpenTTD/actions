# OpenTTD - Update Deployments

Update a existing deployment with a new state.

## Usage

```yaml
- uses: openttd/actions/deployments-update@v1
  with:
    # (required) new state of the deployment; one of the following: in_progress, success, failure
    state: success

    # (optional and only used when state is success) URL where deployment will be available
    url: https://.../

    # (optional) description of the state change
    description: 'a new state change'

    # (required) GitHub Token; cannot be the GITHUB_TOKEN, as it has no access to the deployment
    github-token: ${{ secrets.DEPLOYMENT_TOKEN }}
```
