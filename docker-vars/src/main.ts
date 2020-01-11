import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function getOutputFromExec(command: string): Promise<string> {
  let output = ''
  await exec.exec(command, [], {
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

  const branchName = await getOutputFromExec('git rev-parse --abbrev-ref HEAD')
  if (branchName === 'master') {
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
