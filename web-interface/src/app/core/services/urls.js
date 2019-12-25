(function () {
	'use strict';
	angular
		.module('app.common')
		.provider('urls', function UrlsProvider() {
			var endpoints = {};

			return {
				endpoints: endpoints,
				endpoint: pushEndpoint,
				$get: InstantiateUrls
			};

			function pushEndpoint(endpointName, endpoint) {
				if (endpoints[endpointName]) {
					throw new Error('You have already declared endpoint URL with the same name.' + 'Endpoint: ' + endpointName);
				}

				endpoints[endpointName] = endpoint;
				return this;
			}
		});

	function InstantiateUrls ($window, settings, urlHelper) {
		var endpoints = this.endpoints;
		var devMode = urlHelper.getUrlParam($window, 'dev');

			function api(name) {
				var endpoint = endpoints[name];

				if (!endpoint) {
					throw new Error('There is no such endpoint named: ' + name);
				}

				var args = _.slice(arguments, 1, arguments.length),
					apiUrl = endpoint.api,
					rawUrl = angular.isString(apiUrl) ? apiUrl : apiUrl.apply({}, args);

				if (devMode) {
					return settings.apiUrl + '/' + rawUrl;
				}
				return rawUrl;
			}

			function mock(name) {
				return endpoints[name].mock;
			}

			return {
				api: api,
				mock: mock
			};
	}
}());
