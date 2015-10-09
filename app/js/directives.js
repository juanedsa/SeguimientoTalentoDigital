var directivas = angular.module('app.directives', []);

/** Directiva barra de navegacion superior */
directivas.directive('barraNavegacion', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion.html'
	}
});
