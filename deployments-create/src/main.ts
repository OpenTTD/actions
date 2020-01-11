import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const ref = core.getInput('ref', {required: true})
  const environment = core.getInput('environment', {required: true})
  const version = core.getInput('version', {required: true})
  const date = core.getInput('date', {required: true})
  const tag = core.getInput('docker-tag', {required: true})
  const githubToken = core.getInput('github-token', {required: true})

  if (!github.context.payload || !github.context.payload.repository) {
    throw new Error('Can only be run from within the context of GitHub Actions')
  }

  const owner = github.context.payload.repository.owner.login
  const repo = github.context.payload.repository.name

  const octokit = new github.GitHub(githubToken, {
    previews: ['flash', 'ant-man']
  })
  await octokit.repos.createDeployment({
    owner,
    repo,
    ref,
    environment,
    description: `${version} on ${date}`,
    // Type of 'payload' is set to 'string', but it really is an 'object'
    payload: <string>(<unknown>{
      tag,
      version,
      date
    }),

    // Never merge with 'master'; that is just silly.
    auto_merge: false,
    // No matter what other actions say, assume that if we are called, it
    // is safe to make a deployment.
    required_contexts: []
  })
  core.info(`Scheduled new deployment for ${version} on ${environment}`)
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
