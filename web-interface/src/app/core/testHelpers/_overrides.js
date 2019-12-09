(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	function config(settings) {
		settings.testMode = true;
	}

	angular
		.module('ApplicationInsightsModule', [])
		.provider('applicationInsightsService', function () {
			this.off = true;
			this.$get = [function () {
				return {};
			}];
		});
}());
