# OpenTTD - Annotation check

Check if any previous job in a workflow has any annotation. Report as a failed
step if that was the case. This is mainly to give more visibility to
annotations in runs, as often they need addressing.

## Usage

At the end of a workflow, insert this step with the `needs` containing all
the steps in the workflow.

```yaml
  check_annotations:
    name: Check Annotations
    needs:
    - ...

    if: always() && github.event_name == 'pull_request'

    runs-on: ubuntu-latest

    steps:
    - name: Check annotations
      uses: OpenTTD/actions/annotation-check@v2
```

## Development

- `npm run build`: To compile the TypeScript into JavaScript.
- `npm run format`: To fix any coding-style errors automatically.
- `npm run test`: To run linter, check for coding-style errors, etc.
