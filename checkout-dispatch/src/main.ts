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

async function run(): Promise<void> {
  if (github.context.eventName !== 'repository_dispatch') {
    return
  }
  if (github.context.payload.action !== 'publish_latest_tag') {
    return
  }

  const revList = await getOutputFromExec('git rev-list --tags --max-count=1')
  const describe = await getOutputFromExec(`git describe ${revList} --tags`)

  const ref = `refs/tags/${describe}`
  await exec.exec(`git checkout ${ref}`)
  core.info(`Switched branch to ${ref}`)
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
