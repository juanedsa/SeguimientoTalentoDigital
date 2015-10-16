var directivas = angular.module('app.directives', []);

/** Directiva barra de navegación superior */
directivas.directive('barraNavegacion', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion.html'
	}
});

/** Directiva barra de navegación superior del Administrador */
directivas.directive('barraNavegacionAdmin', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion-admin.html'
	}
});

/** Directiva barra de navegación superior del Beneficiario */
directivas.directive('barraNavegacionBeneficiario', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion-Beneficiario.html'
	}
});

/** Directiva mostrar un modal general */
directivas.directive('modalGeneral', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/modal-general.html'
	}
});

/** Directiva mostrar un modal confirmacion */
directivas.directive('modalConfirmacion', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/modal-confirmacion.html'
	}
});
