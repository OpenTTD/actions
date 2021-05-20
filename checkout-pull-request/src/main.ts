import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  let depth = 4

  while ((await exec.exec('git merge-base HEAD^ HEAD^2', [], {ignoreReturnCode: true})) !== 0) {
    await exec.exec(
      `git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --deepen=${depth} origin HEAD`
    )
    depth *= 4

    if (depth > 256) {
      throw new Error('No common parent found for this merge commit (max-depth-reached)')
    }
  }

  core.info('Found common parent for this merge commit')
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
