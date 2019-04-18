pipeline {
  agent none

  stages {
    stage("Setup") {
      agent {
        docker {
          image 'node'
        }
      }
      steps {
        npm ci
      }
    }

    stage("Build") {
      agent {
        docker {
          image 'node'
        }
      }
      steps {
        npm run build-prod
      }
    }

    stage("Test") {
      agent {
        docker {
          image 'node'
        }
      }
      steps {
        npm test
      }
    }
  }
}
