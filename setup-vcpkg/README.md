# OpenTTD - Setup vcpkg

Install `vcpkg` and set it up to use NuGet for binary caching.
Will install `mono` if the runner OS requires it, or if an install command is provided.

## Usage

```yaml
    - name: Setup vcpkg
      id: vcpkg
      uses: openttd/actions/setup-vcpkg@v6
```
