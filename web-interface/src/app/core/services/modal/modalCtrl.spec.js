/// <reference path="../../testHelpers/_reference.js" />
/// <reference path="resetPasswordCtrl.js" />
/// <reference path="modalCtrl.js" />
(function () {
	'use strict';
	describe('modalCtrl', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var $uibModalInstance,
			data,
			$q,
			vm;

		beforeEach(inject(function ($controller, _$q_) {
			$q = _$q_;
			$uibModalInstance = {
				close: function () {
					var defer = $q.defer();
					defer.resolve({});
					return defer.promise;
				},
				dismiss: function () {
					var defer = $q.defer();
					defer.reject({});
					return defer.promise;
				}
			};

			spyOn($uibModalInstance, 'dismiss').and.callThrough();
			spyOn($uibModalInstance, 'close').and.callThrough();

			vm = $controller('modalCtrl', {
				$uibModalInstance: $uibModalInstance,
				data: data
			});
		}));

		it('should be load Reset Password modal', function () {
			//Assert
			expect(vm).toBeDefined();
			expect(vm.close).toBeDefined();
			expect(vm.ok).toBeDefined();

		});

		it('should be close Reset Password modal', function () {
			//Act
			vm.close();
			//Assert
			expect($uibModalInstance.dismiss).toHaveBeenCalledWith();
		});

		it('should be send request Reset Password', function () {
			//Act
			vm.ok();
			//Assert
			expect($uibModalInstance.close).toHaveBeenCalledWith();
		});

	});
}());
