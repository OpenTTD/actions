# GitHub Actions

This repository contains several GitHub Actions that help with the workflows as used by most other repositories of OpenTTD.
This is mostly done to reduce code duplication between repositories.

As GitHub Actions doesn't allow to include workflows of other projects, this is mostly a nodeJS wrapper around a single step in a workflow.

## Actions

- [annotation-check](annotation-check/): Check if any previous job in a workflow has any annotation.
- [checkout](checkout/): Checkout tags and submodules; complements `actions/checkout`.
- [checkout-dispatch](checkout-dispatch/): Checkout from `remote_dispatch` with `publish_latest_tag`.
- [deploy-aws](deploy-aws/): Deploy new Docker image to AWS.
- [deployments-create](deployments-create/): Create GitHub Deployments.
- [deployments-update](deployments-update/): Update GitHub Deployments status.
- [docker-build](docker-build/): Helper to build Docker images.
- [docker-publish](docker-publish/): Helper to publish Docker images.
- [docker-vars](docker-vars/): Deduce variables needed for other actions in this repository.

## Development

Developing GitHub Actions is difficult, as you cannot execute them on your local machine.
(this is because the `github.context` won't be set on your local machine.)

To get started:
```bash
npm install
npm run all
```

Please always run `npm run all` before committing; otherwise the `dist` files will not be updated.
