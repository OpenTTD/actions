import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'

async function getOutputFromExec(command: string, args?: string[]): Promise<string> {
  let output = ''
  await exec.exec(command, args, {
    silent: true,
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString()
      },
      stderr: (data: Buffer) => {
        // Make sure we can see errors as they happen
        process.stderr.write(data)
      }
    }
  })
  return output.trim()
}

function setOutput(name: string, value: string): void {
  core.setOutput(name, value)
  core.info(`${name}: ${value}`)
}

async function run(): Promise<void> {
  const repository = core.getInput('repository', {required: true})
  const dockerHubUsername = core.getInput('docker-hub-username')

  const repositoryLowerCase = repository.toLowerCase()
  setOutput('name', repositoryLowerCase)

  const version = await getOutputFromExec('git describe --tags')
  setOutput('version', version)

  const date = await getOutputFromExec('date -u +%Y-%m-%dT%H:%M:%SZ')
  setOutput('date', date)

  const sha = await getOutputFromExec('git rev-parse --verify HEAD')
  setOutput('sha', sha)

  // Figure out if we are building for staging; this can either be because we
  // are a remote-trigger with 'publish_master' or because our 'ref' is set to
  // 'refs/heads/master' (instead of a tag). This is still a bit thin, but it
  // is all we got.
  let isStaging
  if (github.context.eventName === 'repository_dispatch') {
    if (github.context.action === 'publish_master') {
      isStaging = true
    } else {
      isStaging = false
    }
  } else {
    if (github.context.ref === 'refs/heads/master') {
      isStaging = true
    } else {
      isStaging = false
    }
  }

  if (isStaging) {
    setOutput('environment', 'staging')
    setOutput('tag', 'development')
    setOutput('tags', 'dev')
  } else {
    const versionParts = version.split('.')
    const versionMajor = `${versionParts[0]}`
    const versionMajorMinor = `${versionParts[0]}.${versionParts[1]}`

    setOutput('environment', 'production')
    setOutput('tag', version)
    setOutput('tags', `${versionMajor} ${versionMajorMinor}`)
  }

  if (dockerHubUsername) {
    setOutput('dry-run', 'false')
  } else {
    setOutput('dry-run', 'true')
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
