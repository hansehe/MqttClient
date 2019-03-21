// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const isDocker = require('is-docker')();

exports.config = {
  allScriptsTimeout: 5000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: isDocker ? {
    'browserName': 'chrome',
    'acceptInsecureCerts': true,
    'chromeOptions': {
      'args': ['no-sandbox', 'headless', 'disable-gpu']
    }
  } : {
      'browserName': 'chrome',
      'acceptInsecureCerts': true
  },
  directConnect: true,
  baseUrl: 'https://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
