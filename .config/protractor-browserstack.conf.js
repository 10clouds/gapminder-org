'use strict';

const _ = require('lodash');
const pkg = require('../package.json');
const browserstack = {
  'browserstack.user': process.env.BROWSER_STACK_USERNAME,
  'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,
  'browserstack.local': !!process.env.BS_LOCAL,
  'browserstack.debug': !!process.env.BS_DEBUG,
  'project': process.env.BS_PROJECT || pkg.name
};

const multis = [
  {
    browserName: 'internet explorer',
    os: 'windows',
    os_version: '8'
  },
/*  {
    browserName: 'firefox',
    os: 'windows'
  },*/
  {
    browserName: 'safari',
    os: 'os x',
    os_version: 'lion'
  }
];

const config = {
  baseUrl: 'http://localhost:3000/',

  specs: [
    '../app/**/*.e2e.ts'
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000,
    print: function () {
    }
  },
  //directConnect: true,

  //capabilities: {
  //  browserName: 'chrome',
  //  chromeOptions: {
  //    args: ['show-fps-counter=true']
  //  }
  //},

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },

  //seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
  reporter: ['spec'],
  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true,

  multiCapabilities: _.map(multis, function(o) {
    return _.merge(_.clone(browserstack), o);
  })

  //seleniumAddress: 'http://hub.browserstack.com/wd/hub'
};

/*if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.multiCapabilities = [
    {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '46',
      name: pkg.name,
      build: process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }
  ];
}*/

exports.config = config;

/*{
 base: 'SauceLabs',
 browserName: 'firefox',
 version: '42',
 name: pkg.name,
 build: process.env.TRAVIS_BUILD_NUMBER,
 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
 }, */
