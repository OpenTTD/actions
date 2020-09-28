# OpenTTD - Workflow deployment

This is a composite action, deploying a new image on AWS.

## Usage

```yaml
- uses: openttd/actions/workflow-deployment@v2
  with:
    # (required) Name of the AWS CloudFormation stack
    aws-stack-name: MyStackName

    # (required) GitHub PAT to use to update deployment status
    deployment-token: ${{ secrets.DEPLOYMENT_TOKEN }}

    # (required) The AWS_ACCESS_KEY_ID to use for all operations
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}

    # (required) The AWS_SECRET_ACCESS_KEY to use for all operations
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

    # (required) The AWS_REGION to use for all operations
    aws-region: ${{ secrets.AWS_REGION }}

    # (optional) Location where staging can be found
    staging-url: https://mystack.staging.openttd.org
```
