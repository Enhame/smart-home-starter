(function () {
	'use strict';

	var gulp = require('gulp');
	var del = require('del');
	var runSequence = require('run-sequence');
	var addsrc = require('gulp-add-src');
	var uglify = require('gulp-uglify');
	//var uncss = require('gulp-uncss');
	var print = require('gulp-print');

	var paths = gulp.paths;

	var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
	});

	gulp.task('partials', function () {
		return gulp.src([
				paths.src + '/{app,partials}/**/*.html',
				paths.tmp + '/{app,partials}/**/*.html'
		])
			.pipe($.minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe($.angularTemplatecache('templateCacheHtml.js', {
				module: 'app'
			}))
			.pipe(gulp.dest(paths.tmp + '/partials/'));
	});

	gulp.task('html', ['jsx', 'inject', 'partials'], function () {
		var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
		var partialsInjectOptions = {
			starttag: '<!-- inject:partials -->',
			ignorePath: paths.tmp + '/partials',
			addRootSlash: false
		};

		var htmlFilter = $.filter('*.html');
		var jsFilter = $.filter('**/*.js');
		var cssFilter = $.filter('**/*.css');
		var vendorFilter = $.filter('**/vendor*.css');
		var assets;

		return gulp.src(paths.tmp + '/serve/*.html')
			.pipe($.inject(partialsInjectFile, partialsInjectOptions))
			.pipe(assets = $.useref.assets())
			.pipe($.rev())
			.pipe(print())
			.pipe(jsFilter)
			.pipe($.ngAnnotate())
			.pipe($.uglify({ preserveComments: $.uglifySaveLicense}))
			.pipe(jsFilter.restore())
			.pipe(cssFilter)
			.pipe($.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
			.pipe($.replace('../bower_components/font-awesome/fonts', '../fonts'))
			.pipe($.csso())
			.pipe(cssFilter.restore())
			.pipe(vendorFilter)
			.pipe(vendorFilter.restore())
			.pipe(assets.restore())
			.pipe($.useref())
			.pipe($.revReplace())
			.pipe(htmlFilter)
			.pipe($.minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe(htmlFilter.restore())
			.pipe(gulp.dest(paths.dist + '/'))
			.pipe($.size({ title: paths.dist + '/', showFiles: true }));
	});

	gulp.task('minify', function () {
		return gulp.src(paths.src + '/lazyLoading/**/*.js')
			.pipe(uglify())
			.pipe(gulp.dest(paths.src + '/lazyLoading/**/*'));
	});

	gulp.task('images', function () {
		return gulp.src(paths.src + '/images/**/*')
			.pipe(gulp.dest(paths.dist + '/images/'));
	});

	gulp.task('lazy', function () {
		return gulp.src(paths.src + '/lazyLoad/**/*')
			.pipe(uglify())
			.pipe(gulp.dest(paths.dist + '/lazyLoad/'));
	});

	gulp.task('addToHomeScreen', function () {
		return gulp.src(paths.src + '/addToHomeScreen/**/*')
			.pipe(gulp.dest(paths.dist + '/addToHomeScreen/'));
	});

	gulp.task('fonts', function () {
		gulp.src($.mainBowerFiles())
			.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
			.pipe($.flatten())
			.pipe(addsrc(paths.src + '/fonts/**/*'))
			.pipe(gulp.dest(paths.dist + '/fonts/'));
	});

	gulp.task('misc', function () {
		return gulp.src(paths.src + '/**/*.ico')
			.pipe(gulp.dest(paths.dist + '/'));
	});

	gulp.task('clean', function (done) {
		del([
			paths.dist + '/**/*',
			paths.tmp + '/**/*'
		], done);
	});

	gulp.task('build', ['clean'], function (done) {
		runSequence(['html', 'images', 'lazy', 'addToHomeScreen', 'fonts', 'misc'], done);
	});
}());
