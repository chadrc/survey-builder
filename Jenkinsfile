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

    stage('Test') {
      steps {
        sh 'npm run lint'
        sh 'npm test'
      }
    }
  }
}
