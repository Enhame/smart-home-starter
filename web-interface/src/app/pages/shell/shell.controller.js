(function () {
	'use strict';

	angular.module('app')
		.controller('shellCtrl', shellCtrl);

	function shellCtrl($rootScope, $state, settings, $scope, $window) {
		var vm = this;

		vm.menuIsOpen = false;
		vm.openMenu = openMenu;
		vm.closeMenu = closeMenu;
		vm.refresh = refresh;

		$rootScope.pageTitle = $state.current.title;
		$rootScope.appName = settings.environmentName;

		function openMenu() {
			vm.menuIsOpen = true;
		}

		function closeMenu() {
			vm.menuIsOpen = false;
		}

		function refresh() {
			$window.location.reload(true);
		}

		$scope.$on('$destroy',
			$scope.$on('$locationChangeStart', function () {
				vm.menuIsOpen = false;
				vm.hidden = false;
			}));

		$scope.$on('$destroy',
			$rootScope.$on('toggleMenu', function () {
				vm.menuIsOpen = !vm.menuIsOpen;
			}));

		$scope.$on('$destroy',
		$rootScope.$on('desktopToggle', function () {
			vm.hidden = !vm.hidden;
		}));
	}
}());
