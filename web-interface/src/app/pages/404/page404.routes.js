(function () {
	'use strict';

	angular.module('app')
		.config(function ($stateProvider) {
			$stateProvider
			.state('shell.page404', {
				url: '/404',
				templateUrl: 'app/pages/404/page404.html',
				controller: 'page404Ctrl',
				title: 'Page does not exist',
				controllerAs: 'vm'
			});
		});
}());
