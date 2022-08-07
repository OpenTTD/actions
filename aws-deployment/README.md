# OpenTTD - AWS Deployment

To facilitate AWS deployments in as little code as possible, this workflow exists.

It creates and updates an environment in the project to track the deployment.
Additionally, it does the actual deployment to AWS.

Deployments are done by updating a ParameterStore entry to the latest sha256 digest of the Docker image to use.
Next, it requests CloudFormation to recheck the indicated Stack for any changes (which it will find based on the ParameterStore change).
CloudFormation will then deploy the new version to ECS.

We wait till CloudFormation is done with the deployment.

## Why is this a workflow, and not an action?

Jobs can use the `environment` tag, which automated deployments.
Workflows can have jobs, Actions cannot.

## Usage

In an earlier job, make sure you know the `digest` and `version` of the new Docker image to deploy.
Next, create a job similar to this:

```yaml
  deploy:
    needs:
    - publish_image

    name: Deploy

    uses: OpenTTD/actions/.github/workflows/aws-deployment.yml@v3
    with:
      is_staging: ${{ github.ref == 'refs/heads/main' }}
      name: StackName
      url_production: https://production.url
      url_staging: https://staging.url
      digest: ${{ needs.publish_image.outputs.digest }}
      version: ${{ needs.publish_image.outputs.version }}
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_REGION: ${{ secrets.AWS_REGION }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

`publish_image` here is the earlier job.

Make sure to have the three secrets in the project, and adjust the `is_staging` branch according to the specific project.
The rest is fully automated.

## Why is there a symlink here?

Reusable workflows have to be in the `.github/workflows` folder, by GitHub demands.
To still keep this folder clear in what it is about, a symlink to the actual workflow.
