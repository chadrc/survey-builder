pipeline {
  agent {
    docker {
      image 'node'
      args '-e HOME=. -e npm_config_cache=npm-cache'
    }
  }

  stages {
    stage('Setup') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build-prod'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      parallel {
        stage('Unit') {
          steps {
            sh 'npm test'
          }
        }

        stage('E2E') {
          agent {
            dockerfile {
              filename 'e2e/e2e-container/Dockerfile'
              dir 'e2e/e2e-container'
            }
          }
          steps {
            sh 'npm run e2e'
          }
        }
      }
    }
  }
}
