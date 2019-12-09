/// <reference path="../../core/testHelpers/_reference.js" />
/// <reference path="confirmationModalCtrl.js" />
(function () {
	'use strict';

	describe('confirmationModalCtrl', function () {

		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var $uibModalInstance,
			vm,
			data;

		beforeEach(inject(function ($controller) {
			$uibModalInstance = {
				close: function () {
					return {};
				},
				dismiss: function () {
					return {};
				}
			};
			spyOn($uibModalInstance, 'dismiss').and.callThrough();
			spyOn($uibModalInstance, 'close').and.callThrough();

			vm = $controller('confirmationModalCtrl', {
				$uibModalInstance: $uibModalInstance,
				data: data
			});
		}));

		it('should can be created', function () {
			//ACT
			//ASSERT
			expect(vm).toBeDefined();
			expect(vm.close).toBeDefined();
			expect(vm.confirm).toBeDefined();
		});

		it('should dismiss modal window on vm.close()', function () {
			//ACT
			vm.close();
			//ASSERT
			expect($uibModalInstance.dismiss).toHaveBeenCalled();
		});

		it('should close modal window on vm.confirm()', function () {
			//ACT
			vm.confirm();
			//ASSERT
			expect($uibModalInstance.close).toHaveBeenCalled();
		});
	});
}());
