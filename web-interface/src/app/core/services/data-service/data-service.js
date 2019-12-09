(function () {
	'use strict';
	angular.module('app')
		.config(function (urlsProvider) {

			urlsProvider
				.endpoint('getTemp',
					{
						api: function () {
							return 'gettemp';
						},
						isMocked: false
					});
		});

	angular.module('app.common')
		.factory('dataService', dataService);

	function dataService($http, urls) {

		return {
			getTemp: getTemp
		};

		///

		function getTemp() {
			return $http.get(urls.api('getTemp'), $http.transform(function (result) {
				return result;
			}));
		}
	}
}());
