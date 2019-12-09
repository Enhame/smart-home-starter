(function () {
	'use strict';

	angular.module('app.common')
		.provider('urlHelper', function () {
			this.getUrlParam = getUrlParam;
			this.$get = function () {
				return {
					getUrlParam: getUrlParam,
					insertParam: insertParam,
					removeParam: removeParam,
					addParamToStringUrl: addParamToStringUrl
				};
			};
		});

	///

	function getUrlParam(windowObj, param) {
		param = param.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
		var currentUrl = decodeURIComponent(windowObj.location.href);
		var regexS = '[\\?&]' + param + '=([^&#]*)';
		var regex = new RegExp(regexS);
		var results = regex.exec(currentUrl); // eslint-disable-line

		if(results === null){
			return null;
		}

		return results[1].replace('/', '');
	}

	function insertParam(windowObj, parameterName, parameterValue) {
		windowObj.location.href = addParameter(windowObj.location.href, parameterName, parameterValue);
	}

	function addParamToStringUrl(url, parameterName, parameterValue) {
		var workCopy = angular.copy(url);
		workCopy = workCopy.replace('/', '');
		workCopy = workCopy.replace('?', '');
		workCopy = parameterName + '=' + parameterValue.toString() + '&' + workCopy;
		return '/?' + workCopy;
	}

	function addParameter(url, parameterName, parameterValue) {
		var cl,
			urlhash,
			sourceUrl,
			replaceDuplicates = true;

		if (url.indexOf('#') > 0) {
			cl = url.indexOf('#');
			urlhash = url.substring(url.indexOf('#'), url.length);
		}
		else {
			urlhash = '';
			cl = url.length;
		}
		sourceUrl = url.substring(0, cl);

		var urlParts = sourceUrl.split('?');
		var newQueryString = '';

		if (urlParts.length > 1) {
			var parameters = urlParts[1].split('&');
			for (var i = 0; i < parameters.length; i++) {
				var parameterParts = parameters[i].split('=');
				if (!(replaceDuplicates && parameterParts[0] === parameterName)) {
					if (newQueryString === '') {
						newQueryString = '?';
					}
					else {
						newQueryString += '&';
					}
					newQueryString += parameterParts[0] + '=' + (parameterParts[1] ? parameterParts[1] : '');
				}
			}
		}

		if (newQueryString === '') {
			newQueryString = '?';
		}
		if (newQueryString !== '' && newQueryString !== '?') {
			newQueryString += '&';
		}
		newQueryString += parameterName + '=' + (parameterValue ? parameterValue : '');

		return urlParts[0] + newQueryString + urlhash;
	}

	function removeParam(windowObj, params, replace) {
		var windowSearch = angular.copy(windowObj.location.search),
			finalUrl = angular.copy(windowObj.location.href);

		windowSearch = windowSearch.replace('?', '');
		_.each(params, function (item) {
			var trimmedParam = item.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]'),
			regexS = '&?' + trimmedParam + '=([^&#]*)',
			regex = new RegExp(regexS);
			windowSearch = windowSearch.replace(regex, '');
		});

		if (_.startsWith(windowSearch, '&')) {
			windowSearch = windowSearch.replace('&', '');
		}

		rewriteSearch();

		function rewriteSearch() {
			var query = windowSearch ? '?' + windowSearch + '#' : '#';
			finalUrl = finalUrl.replace(/\?.*#/, query);
			windowObj.location.replace(finalUrl);
		}
	}

}());
