# OpenTTD - Checkout from dispatch

In OpenTTD projects a `remote_dispatch` can have two event-types: either `publish_latest_tag` or `publish_main`.
In case of the first, the current checkout is switched to the tag.
(`remote_dispatch` is always triggered on `main`, so nothing has to be done for `publish_main`).

## Usage

First make sure to use `actions/checkout` to get the repository.
This action should be called directly after that.

```yaml
- uses: openttd/actions/checkout-dispatch@v2
```
