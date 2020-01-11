import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'

async function run(): Promise<void> {
  if (github.context.eventName !== 'repository_dispatch') {
    return
  }
  if (github.context.action !== 'publish_latest_tag') {
    return
  }

  let revList = ''
  await exec.exec('git rev-list --tags --max-count=1', [], {
    listeners: {
      stdout: (data: Buffer) => {
        revList += data.toString()
      }
    }
  })

  let describe = ''
  await exec.exec(`git describe ${revList} --tags`, [], {
    listeners: {
      stdout: (data: Buffer) => {
        describe += data.toString()
      }
    }
  })

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
