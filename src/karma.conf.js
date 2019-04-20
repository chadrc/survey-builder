// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

const reportPath = path.resolve(__dirname, '../dist/test-reports');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    customLaunchers: {
      CIChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    htmlReporter: {
      outputFile: `${reportPath}/unit/index.html`,

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'Survey Builder Unit Tests',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false
    },
    coverageIstanbulReporter: {
      dir: `${reportPath}/coverage`,
      reports: ['html', 'lcovonly', 'json-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'html', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CIChrome'],
    singleRun: true
  });
};
