import * as core from '@actions/core'
import * as exec from '@actions/exec'

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
  const registryUsername = core.getInput('registry-username', {required: true})
  const registryPassword = core.getInput('registry-password', {required: true})
  const name = core.getInput('name', {required: true})
  const tag = core.getInput('tag', {required: true})
  const registry = core.getInput('registry') || 'docker.io'

  await exec.exec(`docker login ${registry} --username ${registryUsername} --password ${registryPassword}`)
  // This pushes all tags of this docker image at once
  await exec.exec(`docker push ${registry}/${name}`)

  const rawDockerTag = await getOutputFromExec('docker', [
    'inspect',
    '--format={{index .RepoDigests 0}}',
    `${registry}/${name}:${tag}`
  ])
  const dockerTag = rawDockerTag.split('@')[1]
  setOutput('remote-tag', dockerTag)
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
