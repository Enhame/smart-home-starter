/// <reference path="../../core/testHelpers/_reference.js" />

/// <reference path="confirmationModal.js" />

(function () {
	'use strict';

	describe('confirmationModal', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var confirmationModal,
			modalService = {},
			$rootScope,
			$q;

		beforeEach(function () {
			module(function ($provide) {
				$provide.value('modalService', modalService);
			});

			inject(function (_$rootScope_, _$q_, _confirmationModal_) {
				confirmationModal = _confirmationModal_;
				$rootScope = _$rootScope_;
				$q = _$q_;
			});

			mock(modalService, 'showModal', $q.when({ data: [] }));
		});

		it('should show modal', function () {
			// Arrange
			var modalOptions = {
				header: 'ARE YOU SURE?',
				text: 'Are you sure you want to delete this keyword from your profile?',
				confirmBtn: 'Delete',
				cancel: 'Cancel'
			};

			// Act
			confirmationModal.show(modalOptions);
			$rootScope.$digest();

			// Assert
			expect(modalService.showModal.calls.mostRecent().args[0].resolve.data().header).toBe('ARE YOU SURE?');
		});
	});
}());
