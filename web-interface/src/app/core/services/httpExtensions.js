(function () {
	'use strict';

	angular
		.module('app.common')
		.config(function ($provide) {

			$provide.decorator('$http', ['$delegate', '$log', function ($delegate, $log) {
				$delegate.transform = function (transformCallback) {
					return {
						transformResponse: [function (data, headersGetter, status) {
							var result = null,
								error;

							if (status >= 200 && status <= 299) {
								result = !data ? null : angular.fromJson(data);
								return transformCallback(result);
							}

							error = {
								error: true,
								data: data,
								headersGetter: headersGetter,
								status: status,
								extraInfo: 'handled by transformResponse in httpExtensions.js'
							};

							if (status !== 401) {
								$log.error(error);
							}
							else {
								$log.log(error);
							}

							return error;
						}]
					};
				};

				return $delegate;
			}]);
		});
}());
