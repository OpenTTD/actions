import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  const name = core.getInput('name', {required: true})
  const tag = core.getInput('tag', {required: true})
  const tags = core.getInput('tags', {required: true})
  const version = core.getInput('version', {required: true})
  const date = core.getInput('date', {required: true})

  await exec.exec(
    `docker build -t ${name}:${tag} --build-arg BUILD_DATE=${date} --build-arg BUILD_VERSION=${version} .`
  )

  for (const alias of tags.split(' ')) {
    await exec.exec(`docker tag ${name}:${tag} ${name}:${alias}`)
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
