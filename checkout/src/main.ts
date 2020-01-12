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

async function run(): Promise<void> {
  const withTags = (core.getInput('with-tags') || 'false').toUpperCase() === 'TRUE'
  const withSubmodules = (core.getInput('with-submodules') || 'false').toUpperCase() === 'TRUE'

  if (withTags) {
    await exec.exec('git fetch --depth=1 origin +refs/tags/*:refs/tags/*')
  }

  if (withSubmodules) {
    const authHeader = await getOutputFromExec('git config --local --get http.https://github.com/.extraheader')

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
