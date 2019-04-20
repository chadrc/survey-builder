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
            catchError {
              sh 'npm run lint'
            }
            sh "echo ${currentBuild.result} > ./dist/test-reports/lint-result.txt"
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
          sh 'cat `./dist/test-reports/quality/result.text`' == 'Fail'
        }
      }

      try {
        timeout(time: 1, unit: 'MINUTES') {
          def userInput = input(
            id: 'Publish',
            message: 'Quality Check Failed.',
            parameters: [
              [
                $class: 'BooleanParameterDefinition',
                defaultValue: false,
                description: '',
                name: 'Publish Anyway?'
              ]
            ]
          )

          if (userInput != true) {
            currentBuild.result = 'FAILURE'
          }
        }
      } catch (err) {
        def user = err.getCauses()[0].getUser()
        if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
            // didTimeout = true
        } else {
            // userInput = false
            echo "Aborted by: [${user}]"
        }

        currentBuild.result = 'FAILURE'
      }
    }

    stage('Publish Build') {
      echo 'Publish'
    }
  }
}
