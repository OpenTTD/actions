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
  const dockerHubUsername = core.getInput('docker-hub-username', {required: true})
  const dockerHubPassword = core.getInput('docker-hub-password', {required: true})
  const name = core.getInput('name', {required: true})
  const tag = core.getInput('tag', {required: true})

  await exec.exec(`docker login --username ${dockerHubUsername} --password ${dockerHubPassword}`)
  // This pushes all tags of this docker image at once
  await exec.exec(`docker push ${name}`)

  const rawDockerTag = await getOutputFromExec(`docker inspect --format='{{index .RepoDigests 0}}' ${name}:${tag}`)
  const dockerTag = rawDockerTag.split('@')[2]
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
