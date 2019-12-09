(function () {
	'use strict';
	angular.module('app')
		.factory('confirmationModal', confirmationModal);

	function confirmationModal(modalService) {
			return {
				show: show
			};

			function show(params) {
				return modalService.showModal({
					templateUrl: 'app/modals/confirmationModal/confirmationModal.html',
					controller: 'confirmationModalCtrl',
					controllerAs: 'vm',
					backdrop: 'static',
					resolve: {
						data: function () {
							return {
								header: params.header,
								message: params.text,
								typeCss: params.typeCss,
								cancel: params.cancel,
								confirmBtn: params.confirmBtn || 'ok'
							};
						}
					}
				});
			}
		}
}());
