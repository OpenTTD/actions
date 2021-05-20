# OpenTTD - Checkout all commits of a Pull Request

The default `actions/checkout` only checks out the merge commit of a
Pull Request. This means that on `HEAD` is the merge commit, on `HEAD^` is the
base branch, and on `HEAD^2` are the commits of the Pull Request. Sometimes we
need all the commits of the Pull Request available to us, but the default
fetch-depth only give these three commits.

This action tries in a smart way to fetch the full history of a Pull Request,
by fetching more and more commits till `HEAD^` and `HEAD^2` have a common parent.
The log between those are all the commits the Pull Request introduce.

## Usage

First make sure to use `actions/checkout` to get the repository. Use a
`fetch-depth` of 4.
This action should be called directly after that.

```yaml
- uses: openttd/actions/checkout-pull-request@v2
```
