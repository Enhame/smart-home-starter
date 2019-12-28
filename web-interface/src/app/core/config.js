(function () {
	'use strict';

	var app = angular
		.module('app.common')
		.config(config);

	function config($compileProvider, $provide) {
		app.cachedCompileProvider = $compileProvider;
	}

}());
