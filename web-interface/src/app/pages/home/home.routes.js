(function () {
	'use strict';

	angular.module('app')
		.config(function ($stateProvider) {
			$stateProvider
			.state('shell.home', {
				url: '/home',
				templateUrl: 'app/pages/home/home.html',
				controller: 'homeCtrl',
				title: 'Home',
				controllerAs: 'vm'
			});
		});
}());
