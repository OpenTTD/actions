# OpenTTD - Publish Image

Builds the a Docker image based on the `Dockerfile` in the root folder for both amd64 and arm64.
The result is published on the GitHub Container Registry (ghcr.io).

## Getting started

This workflow makes use of the GitHub permission system to write a new package to the GitHub Container Registry.

Sadly, this is a bit of a chicken/egg issue:
- You need to give the repository permission to write to the package.
- The package only exists after it is uploaded for the first time.
- To upload it for the first time, you need permissions.

The short-cut here is to upload any package under the right name to GHCR, set permissions, run the workflow, and then remove the image you uploaded yourself.
It is a bit of a nag, but after that this works without issues, and without additional permissions.

## Usage

```yaml
  publish_image:
    name: Publish image
    uses: OpenTTD/actions/.github/workflows/aws-deployment.yml@main
```

It has two outputs:
- `version`: the semver version you released, or `dev` if it was pushed to the default branch.
- `digest`: the `@sha256` Docker digest of the image.

## Why is there a symlink here?

Reusable workflows have to be in the `.github/workflows` folder, by GitHub demands.
To still keep this folder clear in what it is about, a symlink to the actual workflow.
