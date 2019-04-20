pipeline {
  agent none

  stages {
    stage('Setup') {
      agent {
        docker {
          image 'node'
          args '-e HOME=. -e npm_config_cache=npm-cache'
        }
      }
      steps {
        echo 'home $HOME'
        echo 'cache $npm_config_cache'
        sh 'npm ci'
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'node'
          args '-e HOME=. -e npm_config_cache=npm-cache'
        }
      }
      steps {
        sh 'npm run build-prod'
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'node'
          args '-e HOME=. -e npm_config_cache=npm-cache'
        }
      }
      steps {
        sh 'npm test'
      }
    }
  }
}
