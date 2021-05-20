# OpenTTD - Checkout tags and submodules

The default `actions/checkout` no longer checks out tags and submodules.
For version-detection most repositories need to know the (latest) tag.
And some other repositories use submodules.

## Usage

First make sure to use `actions/checkout` to get the repository.
This action should be called directly after that.

```yaml
- uses: openttd/actions/checkout@v2
  with:
    # checkout tags
    with-tags: false

    # checkout submodules
    with-submodules: true
```
