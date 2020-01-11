import * as core from '@actions/core'
import * as github from '@actions/github'

export type StateType = 'error' | 'failure' | 'inactive' | 'in_progress' | 'queued' | 'pending' | 'success'
const validStates = ['error', 'failure', 'inactive', 'in_progress', 'queued', 'pending', 'success']

// Validate that a string is a validate state, converting the type of the
// variable to StateType.
function isValidState(state: string): state is StateType {
  return validStates.includes(state)
}

async function run(): Promise<void> {
  const state = core.getInput('state', {required: true})
  const description = core.getInput('description')
  const url = core.getInput('url')
  const githubToken = core.getInput('github-token', {required: true})

  if (!isValidState(state)) {
    throw new Error(`The state "${state}" is not a valid state`)
  }

  if (!github.context.payload || !github.context.payload.repository) {
    throw new Error('Can only be run from within the context of GitHub Actions')
  }

  const owner = github.context.payload.repository.owner.login
  const repo = github.context.payload.repository.name
  const deploymentId = github.context.payload.deployment.id

  const octokit = new github.GitHub(githubToken, {
    previews: ['flash', 'ant-man']
  })
  await octokit.repos.createDeploymentStatus({
    owner,
    repo,
    deployment_id: deploymentId,
    state,
    description,
    environment_url: url
  })
  core.info(`Deployment state updated to ${state}`)
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
