(function () {
	'use strict';

	window.mock = function (obj, methodName, result) { // eslint-disable-line
		obj[methodName] = function () {
			return result;
		};
		spyOn(obj, methodName).and.callThrough();
	};
}());
