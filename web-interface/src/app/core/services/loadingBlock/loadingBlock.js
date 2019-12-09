(function () {
	'use strict';
	angular.module('app.common')
		.factory('loadingBlock', loadingBlock);

	function loadingBlock($rootScope) {
		return {
			show: show,
			hide: hide
		};

		///

		function show() {
			$rootScope.$emit('toggleLoadingBlock', true);
		}

		function hide() {
			$rootScope.$emit('toggleLoadingBlock', false);
		}
	}
}());
