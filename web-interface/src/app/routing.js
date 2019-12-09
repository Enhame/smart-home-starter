(function () {
	'use strict';

	angular
		.module('app')
		.config(routes);

	function routes($stateProvider, $urlRouterProvider, settings) {
		$urlRouterProvider.otherwise('/home');
	}
}());
