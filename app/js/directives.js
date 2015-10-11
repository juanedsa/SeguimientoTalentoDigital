var directivas = angular.module('app.directives', []);

/** Directiva barra de navegación superior */
directivas.directive('barraNavegacion', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion.html'
	}
});

/** Directiva mostrar un modal general */
directivas.directive('modalGeneral', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/modal-general.html'
	}
});
