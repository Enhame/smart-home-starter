/// <reference path="../../testHelpers/_reference.js" />
/// <reference path="modalService.js" />

(function () {
	'use strict';

	describe('modalService', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var modalService,
			$uibModal;

		//Declare angularJS service instance before each test in scope
		beforeEach(inject(function (_modalService_, _$uibModal_) {
			modalService = _modalService_;
			$uibModal = _$uibModal_;

			spyOn($uibModal, 'open').and.callThrough();
		}));


		it('Notification modal test', function () {
			//Act
			modalService.showNotification('header', 'message');

			//Assert
			expect($uibModal.open).toHaveBeenCalled();
		});

		it('Error modal test', function () {
			//Act
			modalService.showError('error');

			//Assert
			expect($uibModal.open).toHaveBeenCalled();
		});

		it('Confirmation modal test', function () {
			//Arrange
			var modalParams = {
				header: 'header',
				message: 'message',
				cancel: true,
				okName: 'newOkName'
			};

			//Act
			modalService.showConfirmationModal(modalParams);

			//Assert
			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should show custom modal by templateUrl and controller (optional) name', function () {
			//Arrange
			var modalParams = {
				templateUrl: 'customUrl'
			};

			//Act
			modalService.showModal(modalParams);

			//Assert
			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should not show custom modal without template or templateUrl in params', function () {
			//Arrange
			var modalParams = {};

			//Act
			modalService.showModal(modalParams);

			//Assert
			expect($uibModal.open).not.toHaveBeenCalled();
		});
	});
}());
