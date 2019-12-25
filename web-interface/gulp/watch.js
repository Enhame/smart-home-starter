(function () {
	'use strict';

	var gulp = require('gulp');
	var paths = gulp.paths;
	//var watch = require('gulp-watch');
	require('colors');

	gulp.task('watch', ['inject'], function () {
		gulp.watch([
			paths.src + '/*.html',
			paths.src + '/{app,components,partials}/**/*.scss',
			paths.src + '/{app,components,partials}/**/*.js',
			'bower.json'
		], ['inject']);
	});

}());
