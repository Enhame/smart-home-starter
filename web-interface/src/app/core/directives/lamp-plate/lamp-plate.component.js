(function () {
	'use strict';
	angular
		.module('app.common')
		.directive('lampPlate', lampPlate);

	function lampPlate() {
		return {
			restrict: 'E',
			templateUrl: 'app/core/directives/lamp-plate/lamp-plate.template.html',
			controller: lampPlateCtrl,
			replace: true,
			controllerAs: 'vm',
			scope: {},
			bindToController: true
		};
	}

	function lampPlateCtrl(actionService, $scope) {
		var vm = this;
		vm.toggle = toggle;
		vm.switchState = false;

		init();

		///

		function init() {
			vm.isLoading = true;
		}

		function toggle() {
			var params = {
				type: 'switch',
				pin: 6,
				state: !vm.switchState
			};

			actionService.sendAction(params)
				.then(function () {
				});
		}

		$scope.$on('$destroy',
			$scope.$watch(function () {
				return $scope.vm.switchState;
			}, function () {
				toggle();
			})
		);
	}
}());
