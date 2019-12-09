(function () {
	'use strict';

	angular.module('app.common')
		.controller('modalCtrl', modalCtrl);

	function modalCtrl($uibModalInstance, data) {
		var vm = this;
		vm.data = data;
		vm.ok = ok;
		vm.close = close;

		///

		function ok () {
			$uibModalInstance.close();
		}

		function close() {
			$uibModalInstance.dismiss();
		}
	}
}());
