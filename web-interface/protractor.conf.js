'use strict';

require('babel/register');
var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths,
	HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter'),
	SpecReporter = require('jasmine-spec-reporter');

// An example configuration file.
exports.config = {
	// The address of a running selenium server.
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	//seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

	//seleniumArgs: ['-Dwebdriver.ie.driver=IEDriverServer_64.exe'],
	seleniumArgs: ['-Dwebdriver.ie.driver=IEDriverServer.exe'],

	chromeOnly: false,
	//maxSessions: 1,
	//maxInstances: 1,

	// Capabilities to be passed to the webdriver instance.
	multiCapabilities: [
		{
			'browserName': 'chrome'
		}
	//,
	//{
	//	'browserName': 'firefox'
	//},
	//{
	//	'browserName': 'internet explorer',
	//	'platform': 'ANY',
	//	'version': '11',
	//	//'ie.forceCreateProcessApi': true,
	//	//'ie.browserCommandLineSwitches': '-private',
	//	'ie.ensureCleanSession': true
	//}
		//{
		//  'browserName': 'phantomjs',

		//  /* 
		//   * Can be used to specify the phantomjs binary path.
		//   * This can generally be ommitted if you installed phantomjs globally.
		//   */
		//  'phantomjs.binary.path': require('phantomjs').path,

		//  /*
		//   * Command line args to pass to ghostdriver, phantomjs's browser driver.
		//   * See https://github.com/detro/ghostdriver#faq
		//   */
		//  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
		//}
	],

	framework: 'jasmine2',
	onPrepare: function () {
		var jasmineReporters = require('jasmine-reporters');
		browser.driver.manage().window().setSize(1920, 1080); // eslint-disable-line
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			filePrefix: 'protractor_xmloutput',
			savePath: 'testresults'
		}));
		jasmine.getEnv().addReporter(new SpecReporter({
			prefixes: {
				success: '[PASSED] ',
				failure: '[FAILED] ',
				pending: '* '
			}
		}));
		jasmine.getEnv().addReporter(
				new HtmlScreenshotReporter({
					dest: 'testresults/screenshots',
					filename: 'report.html',
					captureOnlyFailedSpecs: false
				})
			);
	},

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	specs: [paths.e2e + '/tests/**/*.*'],
	//specs: [paths.e2e + '/tests/CoordinatorHomePage.spec.js'],
	//specs: [paths.e2e + '/tests/ExpertDetails.spec.js'],
	//specs: [paths.e2e + '/tests/LoginPage.spec.js'],
	//specs: [paths.e2e + '/tests/NewProjectPage.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsPage.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsConsultationsTab.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsExpertsTab.spec.js'],
	//specs: [paths.e2e + '/tests/NotFoundPage.spec.js'],
	//specs: [paths.e2e + '/tests/ConsultationsPage.spec.js'],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () { }
	}
};
