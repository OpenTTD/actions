# OpenTTD - Deploy to AWS

After a new Docker image is published, AWS needs to be informed to deploy this new version.
This can be done either on staging or production, depending on the parameter.

This is meant to be used on an AWS account where the OpenTTD stacks are deployed.

## Usage

```yaml
- uses: openttd/actions/deploy-aws@v2
  with:
    # (required) your AWS access key
    aws-access-key-id: YOUR-AWS-ACCESS-KEY-ID

    # (required) your AWS secret key
    aws-secret-access-key: YOUR-AWS-SECRET-ACCESS-KEY

    # (required) the region we are deploying in
    aws-region: YOUR-AWS-REGION

    # (required) the name of the Stack/Parameter to deploy
    name: Testing
```
