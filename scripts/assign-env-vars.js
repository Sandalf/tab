
// Used to assign stage-specific env vars in our CI setup
// to the env var names used in app code.

// All env vars we want to pick up from the CI environment.
export const envVars = [
  'NODE_ENV',
  'AWS_REGION',
  // AWS Cognito
  'COGNITO_REGION',
  'COGNITO_IDENTITYPOOLID',
  'COGNITO_USERPOOLID',
  'COGNITO_CLIENTID',
  // Web app
  'PUBLIC_PATH',
  // 'WEB_HOST', // optional
  // 'WEB_PORT', // optional
  // GraphQL
  'TABLE_NAME_APPENDIX',
  // 'GRAPHQL_PORT', // optional
  // Endpoints
  'GRAPHQL_ENDPOINT',
  'DYNAMODB_ENDPOINT',
  'S3_ENDPOINT',
  // Secrets
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_KEY'
]

// Expect one argument, the stage name.
const assignEnvVars = function (stageName, allEnvVarsRequired = true) {
  // Using the name of the stage, assign the stage-specific
  // value to the environment value name.
  const stageNameUppercase = stageName ? stageName.toUpperCase() : ''
  const stagePrefix = stageNameUppercase ? `${stageNameUppercase}_` : ''
  envVars.forEach((envVar) => {
    let stageEnvVarName = `${stagePrefix}${envVar}`
    let stageEnvVar = process.env[stageEnvVarName]

    if (typeof stageEnvVar === 'undefined' || stageEnvVar === null) {
      // Optionally throw an error if an env variable is not set.
      if (allEnvVarsRequired) {
        throw new Error(`Environment variable ${stageEnvVarName} must be set.`)
      }
    } else {
      process.env[envVar] = stageEnvVar
    }
  })
}

export default assignEnvVars
