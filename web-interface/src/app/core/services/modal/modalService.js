(function () {
	'use strict';

	angular.module('app.common')
		.factory('modalService', function ($uibModal, $rootScope) {
			return {
				showNotification: showNotification,
				showError: showError,
				showModal: showModal,
				showConfirmationModal: showConfirmationModal
			};

			///

			function showModal(options) {
				if (options.templateUrl || options.template) {
					var modalSettings = {
						scope: $rootScope.$new(),
						controllerAs: 'vm',
						backdrop: 'static'
					},
						modalInstance;

					angular.extend(modalSettings, options);
					modalInstance = $uibModal.open(modalSettings);

					return modalInstance.result;
				}
			}

			function showNotification(header, message) {
				return show(header, message, 'modal-default notification');
			}

			function showConfirmationModal(options) {
				return show(options.header, options.message, 'modal-default confirmation', options.cancel, options.okName, options.className);
			}

			function showError(message, correlationId) {
				message = correlationId ? message + '<br/>Correlation ID: ' + correlationId : message;

				return show('Error', message, 'error');
			}

			function show(header, message, typeCss, cancel, okName, className) {
				var modalInstance = $uibModal.open({
					templateUrl: 'app/core/services/modal/modal.html',
					controller: 'modalCtrl',
					controllerAs: 'vm',
					backdrop: 'static',
					windowClass: className,
					resolve: {
						data: function () {
							return {
								header: header,
								message: message,
								typeCss: typeCss,
								cancel: cancel,
								okName: okName || 'ok'
							};
						}
					}
				});
				return modalInstance.result;
			}
		});
}());
