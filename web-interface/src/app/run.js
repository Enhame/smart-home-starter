(function () {
	'use strict';

	angular
		.module('app')
		.run(run);

	function run($rootScope, $state, $stateParams, $location, $document, $window, $interval, dataService) {
		// getTemp();
		//
		// $interval(function () {
		// 	getTemp();
		// }, 20000);
		//
		// function getTemp() {
		// 	dataService.getTemp()
		// 		.then(function (res) {
		// 			if (res.data && res.data.temp !== 0 && res.data.humidity !== 0) {
		// 				$rootScope.tempData = res.data;
		// 			}
		// 		});
		// }
	}

}());
