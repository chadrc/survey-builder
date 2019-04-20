pipeline {
  agent none

  stages {
    stage('Build') {
      agent {
        docker {
          image 'node'
          args '-e HOME=. -e npm_config_cache=npm-cache'
        }
      }
      steps {
        sh 'npm ci'
        sh 'npm run build-prod'
        sh 'npm test'
      }
    }
  }
}
