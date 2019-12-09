(function () {
	'use strict';

	angular.module('app')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl(actionService, enums) {
		var vm = this;
		vm.switchState = false;
		vm.actions = [];
		vm.deviceTypes = enums.deviceTypes;

		init();

		///

		function init() {
			vm.isLoading = true;
			loadActions();
		}

		function loadActions() {
			actionService.getActionsList()
				.then(function (res) {
					vm.actions = res.data;
				});
		}
	}

}());
