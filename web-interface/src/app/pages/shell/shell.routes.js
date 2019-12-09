(function () {
	'use strict';

	angular.module('app')
		.config(routes);

	function routes($stateProvider, settings) {

		$stateProvider
		.state('shell', {
			url: '',
			abstract: true,
			templateUrl: 'app/pages/shell/shell.html',
			controller: 'shellCtrl',
			controllerAs: 'shell'
		});
	}
}());
