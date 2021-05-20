import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const githubToken = core.getInput('github-token', {required: true})

  if (!github.context.payload || !github.context.payload.repository) {
    throw new Error('Can only be run from within the context of GitHub Actions')
  }

  const owner = github.context.payload.repository.owner.login
  const repo = github.context.payload.repository.name
  const run_id = github.context.runId

  const octokit = github.getOctokit(githubToken)

  const check_suite = await octokit.actions.getWorkflowRun({
    owner,
    repo,
    run_id
  })
  if (check_suite.data.check_suite_id === undefined) {
    throw new Error("Couldn't find check_suite_id for current run")
  }

  const list_runs = await octokit.checks.listForSuite({
    owner,
    repo,
    check_suite_id: check_suite.data.check_suite_id
  })

  core.info('Overview of jobs:')

  let count = 0
  for (const check_run of list_runs.data.check_runs) {
    if (check_run.output.title) {
      core.info(`- ${check_run.output.title}: ${check_run.output.summary}`)
    }
    count += check_run.output.annotations_count
  }

  if (count === 0) {
    core.info('No annotations found')
  } else {
    core.setFailed(`${count} annotation(s) found`)
  }
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
