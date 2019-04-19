pipeline {
  agent none

  stages {
    stage("Setup") {
      agent {
        docker { image 'node' }
      }
      steps {
        sh 'npm ci'
      }
    }

    stage("Build") {
      agent {
        docker { image 'node' }
      }
      steps {
        sh 'npm run build-prod'
      }
    }

    stage("Test") {
      agent {
        docker { image 'node' }
      }
      steps {
        sh 'npm test'
      }
    }
  }
}
