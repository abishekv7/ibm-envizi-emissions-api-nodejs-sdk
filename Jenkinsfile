@Library(['ai-apps-shared-pipeline', 'ei-offering-config']) _

sterlingPipeline {
    repoName = "ibm-envizi-emissions-api-nodejs-sdk-internal"
    minikubeTestEnabled = false
    agentLabel = null
    buildCommand = { sh 'npx tsc' }
    unitTestCommand = { sh 'npm run test' }
    detectSecretsEnabled = true
    dockerScanForVulnerabilitiesEnabled = true
    dockerBuildEnabled = false
    uploadArtifactEnabled = false
    semanticReleaseBuildFiles = true
    deploymentEnabled = false
    sonarQubeAdditionalProperties = {[
        "sonar.exclusions":"boms/**"
    ]}

    acceptableFailedStageList = null

}
