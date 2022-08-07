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
