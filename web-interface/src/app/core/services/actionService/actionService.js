(function () {
	'use strict';
	angular.module('app')
		.config(function (urlsProvider) {

			urlsProvider
				.endpoint('sendAction',
					{
						api: function () {
							return 'actions';
						},
						isMocked: false
					})
				.endpoint('getActions',
				{
					api: function () {
						return 'actionsList';
					},
					isMocked: false
				});
		});

	angular.module('app.common')
		.factory('actionService', actionService);

	function actionService($http, urls) {

		return {
			sendAction: sendAction,
			getActionsList: getActionsList
		};

		///

		function sendAction(params) {
			return $http.post(urls.api('sendAction'), params, $http.transform(function (result) {
				return result;
			}));
		}

		function getActionsList() {
			return $http.get(urls.api('getActions'), $http.transform(function (result) {
				return result;
			}));
		}
	}
}());
