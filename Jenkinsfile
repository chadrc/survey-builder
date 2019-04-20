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

    stage('Code Quality') {
      parallel {
        stage('Lint') {
          steps {
            sh 'npm run lint'
          }
        }

        stage('Test') {
          steps {
            sh 'npm test'
          }
        }
      }
    }
  }
}
