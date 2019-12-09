(function () {
	'use strict';
	angular.module('app')
		.controller('page404Ctrl', page404Ctrl);

	function page404Ctrl(authService) {
		var vm = this;

		vm.accountManager = {};

		init();
		///
		function init() {
			authService.getManagerInfo().then(function (response) {
				vm.accountManager = response.data;
			});
		}
	}
}());
