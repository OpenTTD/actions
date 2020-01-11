import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  const withTags = core.getInput('with-tags') || false
  const withSubmodules = core.getInput('with-submodules') || true

  if (withTags) {
    await exec.exec('git fetch --depth=1 origin +refs/tags/*:refs/tags/*')
  }

  if (withSubmodules) {
    let authHeader = ''
    await exec.exec('git config --local --get http.https://github.com/.extraheader', [], {
      listeners: {
        stdout: (data: Buffer) => {
          authHeader += data.toString()
        }
      }
    })

    await exec.exec('git submodule sync --recursive')
    await exec.exec(
      `git -c "http.extraheader=${authHeader}" -c protocol.version=2 submodule update --init --force --recursive --depth=1`
    )
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
