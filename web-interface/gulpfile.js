/// <vs />
(function () {
	'use strict';

	var gulp = require('gulp');

	gulp.paths = {
		src: 'src',
		dist: 'dist',
		tmp: '.tmp',
		e2e: 'e2e',
		publish: '../web-server/data'
	};

	require('require-dir')('./gulp');

	gulp.task('default', ['clean'], function () {
		gulp.start('build');
	});
}());
