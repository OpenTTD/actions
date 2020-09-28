# OpenTTD - Workflow commit checker

This is a composite action, validating the commits in a pull-request for
a various of things we like to have the same between all repositories using
this workflow. For example: commit message, whitespace use, etc.

## Usage

```yaml
- uses: openttd/actions/workflow-commit-checker@v2
```
