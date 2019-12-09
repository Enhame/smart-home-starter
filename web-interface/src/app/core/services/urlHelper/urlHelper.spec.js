/// <reference path="../../testHelpers/_reference.js" />
/// <reference path="urlHelper.js" />
(function () {
	'use strict';

	describe('urlHelper', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var urlHelper;

		beforeEach(function () {
			inject(function (_urlHelper_) {
				urlHelper = _urlHelper_;
			});
		});

		it('should correctly getUrlParam', function () {
			// Arrange
			var windowObj = {
				location: {
					href: 'http://localhost:3000/?index=1/#/home'
				}
			};

			// Act
			var indexParam = urlHelper.getUrlParam(windowObj, 'index');

			// Assert
			expect(indexParam).toBe('1');
		});

		it('should correctly insertParam to current # url ', function () {
			// Arrange
			var windowObj = {
				location: {
					href: 'http://localhost:3000/#/home'
				}
			};

			// Act
			urlHelper.insertParam(windowObj, 'mock', 1);

			// Assert
			expect(windowObj.location.href).toBe('http://localhost:3000/?mock=1#/home');
		});

		it('should correctly insertParam to current url', function () {
			// Arrange
			var windowObj = {
				location: {
					href: 'http://localhost:3000?a=1&b=2'
				}
			};

			// Act
			urlHelper.insertParam(windowObj, 'redirectUrl', 'home');

			// Assert
			expect(windowObj.location.href).toBe('http://localhost:3000?a=1&b=2&redirectUrl=home');
		});

		it('should correctly removeParam to current url', function () {
			// Arrange
			var windowObj = {
				location: {
					href: 'http://localhost:3000/?param=1&b=2#/home',
					search: '?param=1&b=2',
					replace: function (a) {
						this.href = a;
					}
				}
			};

			// Act
			urlHelper.removeParam(windowObj, ['param']);

			// Assert
			expect(windowObj.location.href).toBe('http://localhost:3000/?b=2#/home');
		});

		it('should correctly  addParam to current url', function () {
			// Act
			var res = urlHelper.addParamToStringUrl('home', 'mock', 1);

			// Assert
			expect(res).toBe('/?mock=1&home');
		});

	});
}());
