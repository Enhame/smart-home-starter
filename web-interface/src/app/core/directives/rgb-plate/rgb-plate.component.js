(function () {
	'use strict';
	angular
		.module('app.common')
		.directive('rgbPlate', rgbPlate);

	function rgbPlate() {
		return {
			restrict: 'E',
			templateUrl: 'app/core/directives/rgb-plate/rgb-plate.template.html',
			controller: rgbPlateCtrl,
			replace: true,
			controllerAs: 'vm',
			scope: {
				config: '='
			},
			bindToController: true
		};
	}

	function rgbPlateCtrl(actionService, $scope) {
		var vm = this;
		vm.toggle = toggle;
		vm.switchState = false;
		vm.rgbColor = '';
		vm.options = {
			pos: 'top right',
			format: 'rgb',
			alpha: false
		};

		vm.eventApi = {
			onChange: _.debounce(onColorPick, 200)
		};

		init();

		///

		function init() {
			vm.isLoading = true;
			vm.switchState = vm.config.state;
			vm.rgbColor = `rgb(${vm.config.red},${vm.config.green},${vm.config.blue})`;
		}

		function onColorPick(api, color, event) {
			var rgbString = color.replace(/(rgb)|\(|\)|\s/g, ''),
				colors = rgbString.split(','),
				params = {
					deviceType: 'rgb',
					type: 'recolor',
					red: colors[0],
					green: colors[1],
					blue: colors[2]
			};

			sendAction(params);

		}

		function toggle() {
			var params = {
				deviceType: 'rgb',
				type: 'switch',
				state: vm.switchState
			};

			sendAction(params);
		}

		function sendAction(action) {
			actionService.sendAction(action)
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
