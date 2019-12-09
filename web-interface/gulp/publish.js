(function () {
	'use strict';

	var gulp = require('gulp');
	var paths = gulp.paths;
	var del = require('del');
	var runSequence = require('run-sequence');

	gulp.task('publish', function () {
		runSequence('build', 'cleanPublish', 'copyPublish');
	});

	gulp.task('cleanPublish', function (done) {
		del([
			paths.publish + '/fonts/',
			paths.publish + '/images/',
			paths.publish + '/lazyLoad/',
			paths.publish + '/scripts/',
			paths.publish + '/styles/',
			paths.publish + '/index.html'
		], { force: true }, done);
	});

	gulp.task('copyPublish', function () {
		return gulp.src(paths.dist + '/**/*')
			.pipe(gulp.dest(paths.publish + '/'));
	});
}());
