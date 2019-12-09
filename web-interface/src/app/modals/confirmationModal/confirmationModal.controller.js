(function () {
	'use strict';

	angular.module('app')
		.controller('confirmationModalCtrl', confirmationModalCtrl);

	function confirmationModalCtrl($uibModalInstance, data) {
		var vm = this;
		vm.close = close;
		vm.confirm = confirm;
		vm.modalOptions = data;

		function close() {
			$uibModalInstance.dismiss();
		}

		function confirm() {
			$uibModalInstance.close();
		}

	}
}());
