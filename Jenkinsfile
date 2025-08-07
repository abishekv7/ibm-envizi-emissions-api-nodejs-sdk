@Library(['ai-apps-shared-pipeline', 'ei-offering-config']) _

sterlingPipeline {
    repoName = "ibm-envizi-emissions-api-nodejs-sdk-internal"
    minikubeTestEnabled = false
    agentLabel = null
    agentDINDPullSecret = 'fd4bnonp-docker-secret'  // pragma: allowlist secret
    agentImagePullSecret = 'fd4bnonp-docker-secret'  // pragma: allowlist secret
    agentDINDCPULimits = '4'
    detectSecretsEnabled = true
    dockerBuildEnabled = false
    
    // Exclude BOMs from SonarQube analysis 
    sonarQubeAdditionalProperties = {[
        "sonar.exclusions":"boms/**"
    ]}

    acceptableFailedStageList = null

}
