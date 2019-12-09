/*global __dirname*/
(function () {
	'use strict';

	var gulp = require('gulp');
	var path = require('path');
	//var $ = require('gulp-load-plugins')();
	var wiredep = require('wiredep');
	var paths = gulp.paths;
	var Server = require('karma').Server;

	function runTests(singleRun, done) {
		var bowerDeps = wiredep({
			directory: 'bower_components',
			exclude: ['bootstrap-sass-official'],
			dependencies: true,
			devDependencies: true
		});

		var testFiles = bowerDeps.js.concat([
			paths.src + '/app/app.js',
			paths.src + '/app/core/app.common.module.js',
			paths.src + '/app/**/*.js',
			paths.tmp + '/**/*.js',
			paths.src + '/app/**/backend.routes.js',
			paths.src + '/app/**/testHelpers/*.js'
		]);

		new Server({
			configFile: path.join(__dirname, '../karma.conf.js'),
			files: testFiles,
			exclude: [
				paths.src + '/app/common/utils/bliss-fonts.js',
				paths.src + '/app/angular-applicationinsights.js'
			],
			singleRun: singleRun
		}, done).start();
	}

	gulp.task('test', ['eslint', 'partials'], function (done) {
		runTests(true, done);
	});

	gulp.task('testw', ['eslintw', 'partials'], function (done) {
		runTests(false, done);
	});
}());
