# GitHub Actions

This repository contains several GitHub Actions and Workflows that help with the GitHub Actions for other repositories of OpenTTD.

## Actions

- [annotation-check](annotation-check/): Check if any previous job in a workflow has any annotation.
- [checkout](checkout/): Checkout tags and submodules; complements `actions/checkout`.
- [checkout-dispatch](checkout-dispatch/): Checkout from `remote_dispatch` with `publish_latest_tag`.
- [checkout-pull-request](checkout-pull-request/): Checkout all commits of a Pull Request.

## Workflows

- [aws-deployment](aws-deployment/): Deploys a new version of a CloudFormation Stack to AWS.
- [publish-image](publish-image/): To publish a Docker image to GitHub Container Registry.

## Reusing Workflows

Example of how to use a [reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows):

```
job:
  uses: OpenTTD/actions/.github/workflows/rw-<workflow>.yml@v3
  with:
    # See each workflow for their parameters.
```

- [Annotation Check](.github/workflows/rw-annotation-check.yml): Checks if any of the earlier jobs have any annotation.
- [Python - Black](.github/workflows/rw-py-black.yml): Runs "black" over the code.
- [Python - CodeQL](.github/workflows/rw-py-codeql.yml): Runs "CodeQL" over the code.
- [Python - Flake8](.github/workflows/rw-py-flake8.yml): Runs "flake8" over the code.
