# GitHub Actions

This repository contains several GitHub Actions and Workflows that help with the GitHub Actions for other repositories of OpenTTD.

## Actions

- [annotation-check](annotation-check/): Check if any previous job in a workflow has any annotation.
- [checkout-pull-request](checkout-pull-request/): Checkout all commits of a Pull Request.
- [setup_vcpkg](setup-vcpkg/): Install vcpkg and configure its cache.

## Reusing Workflows

Example of how to use a [reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows):

```
job:
  uses: OpenTTD/actions/.github/workflows/rw-<workflow>.yml@v4
  with:
    # See each workflow for their parameters.
```

- [Annotation Check](.github/workflows/rw-annotation-check.yml): Checks if any of the earlier jobs have any annotation.
- [Baseset - Build](.github/workflows/rw-baseset-build.yml): Build an OpenTTD baseset repository.
- [Baseset - Metadata](.github/workflows/rw-baseset-build.yml): Detects metadata for an OpenTTD baseset repository.
- [CDN - upload](.github/workflows/rw-cdn-upload.yml): Upload the content of an artifact to the CDN.
- [Docker - Build](.github/workflows/rw-docker-build.yml): Build a new Docker container, multi-arch, and push to GitHub Container Registry.
- [Entry - Preview - Docker/Nomad](.github/workflows/rw-entry-preview-docker-nomad.yml): Entrypoint for previewing projects using Docker and Nomad
- [Entry - Release - Baseset](.github/workflows/rw-entry-release-baseset.yml): Entrypoint for releasing baseset projects (OpenGFX, OpenSFX, OpenMSX)
- [Entry - Release - Docker/Nomad](.github/workflows/rw-entry-release-docker-nomad.yml): Entrypoint for releasing projects using Docker and Nomad
- [Entry - Testing - Baseset](.github/workflows/rw-entry-testing-baseset.yml): Entrypoint for testing baseset projects (OpenGFX, OpenSFX, OpenMSX)
- [Entry - Testing - Docker/Python](.github/workflows/rw-entry-testing-docker-py.yml): Entrypoint for testing projects using Docker and Python
- [Nomad - Deploy](.github/workflows/rw-nomad-deploy.yml): Deploy a new service no Nomad.
- [Nomad - Reload](.github/workflows/rw-nomad-reload.yml): Triggers the reload triggers of a service on Nomad.
- [Preview - Label](.github/workflows/rw-preview-label.yml): Ensure this PR is the only one with a preview label.
- [Python - Black](.github/workflows/rw-py-black.yml): Runs "black" over the code.
- [Python - CodeQL](.github/workflows/rw-py-codeql.yml): Runs "CodeQL" over the code.
- [Python - Flake8](.github/workflows/rw-py-flake8.yml): Runs "flake8" over the code.
- [Symbols - upload](.github/workflows/rw-symbols-upload.yml): Upload the content of an artifact to the Symbol Server.
