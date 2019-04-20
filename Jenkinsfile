pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      dir 'ci-container'
      args '-e HOME=. -e npm_config_cache=npm-cache -e CHROME_BIN=/usr/bin/google-chrome'
    }
  }

  stages {
    stage('Setup') {
      steps {
        sh 'npm ci'
        sh 'npm run clean'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build-prod'
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
          steps {
            sh 'npm run e2e'
          }
        }
      }
    }

    stage('Lint') {
      steps {
        catchError {
          sh 'npm run lint'
        }
        sh "echo ${currentBuild.result} >> ./dist/test-reports/lint-result.txt"
        sh 'echo Lint Result: `cat ./dist/test-reports/lint-result.txt`'
      }
    }
  }
}
