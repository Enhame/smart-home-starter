(function () {
	'use strict';

	angular
		.module('app')
		.constant('settings', angular.extend({}, {
			apiUrl: 'http://192.168.1.37'
		}, window.PUBLISH_SETTINGS)); // eslint-disable-line
}());
