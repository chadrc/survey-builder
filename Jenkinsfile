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
        sh 'mkdir -p dist/test-reports'
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

        stage('Lint') {
          steps {
            writeFile(
              file: './dist/test-reports/lint-result.txt',
              text: sh(script: 'npm run lint', returnStatus: true).toString()
            )
          }
        }
      }
    }

    stage('Quality Check') {
      steps {
        sh 'npm run quality'
      }
    }

    stage('Request Permission') {
      when {
        expression {
          readFile('./dist/test-reports/quality/result.text').trim() == 'Fail'
        }
      }

      steps {
        timeout(time: 1, unit: 'MINUTES') {
          input(id: 'Publish', message: 'Quality Check Failed. Publish Anyway?')
        }
      }
    }

    stage('Publish Build') {
      steps {
        echo 'Publish'
      }
    }
  }
}
