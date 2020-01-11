import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const awsAccessKeyId = core.getInput('aws-access-key-id', {required: true})
  const awsSecretAccessKey = core.getInput('aws-secret-access-key', {required: true})
  const awsRegion = core.getInput('aws-region', {required: true})
  const name = core.getInput('name', {required: true})

  if (!github.context.payload.deployment) {
    throw new Error('Can only be run from within the context of GitHub Actions deployment event')
  }

  let environment
  if (github.context.payload.deployment.environment === 'production') {
    environment = 'Production'
  } else {
    environment = 'Staging'
  }

  const stack = `Live-${environment}-${name}`
  const parameter = `/Live/Version/${environment}/${name}`

  const tag = github.context.payload.deployment.payload.tag
  const version = github.context.payload.deployment.payload.version
  const date = github.context.payload.deployment.payload.date

  const options = {
    env: {
      AWS_ACCESS_KEY_ID: awsAccessKeyId,
      AWS_SECRET_ACCESS_KEY: awsSecretAccessKey
    }
  }

  await exec.exec(
    `aws ssm put-parameter --region ${awsRegion} --name ${parameter} --type String --overwrite --value "@${tag}" --description "${version} on ${date}"`,
    [],
    options
  )
  await exec.exec(
    `aws cloudformation update-stack --region ${awsRegion} --stack-name ${stack} --use-previous-template`,
    [],
    options
  )

  core.info('Waiting for deployment to finish .. (normally ~3 minutes)')
  await exec.exec(
    `aws cloudformation wait stack-update-complete --region ${awsRegion} --stack-name ${stack}`,
    [],
    options
  )
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
