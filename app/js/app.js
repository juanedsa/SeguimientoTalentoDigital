var app = angular.module("SeguimientoTDApp", [
	'googlechart',
	"firebase",
	"ngRoute",
	"app.controllers",
	"app.directives",
	"app.constantes",
	"app.services",
	"app.filters"
]);

/** Configuracion de la app */
app.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/',{
			templateUrl:'templates/login.html',
			controller: 'LoginCtrl'
		})
		.when('/usuarios',{
			templateUrl:'templates/usuarios.html',
			controller: 'UsuarioCtrl'
		})
		.when('/beneficiarios',{
			templateUrl:'templates/beneficiarios.html',
			controller: 'BeneficiarioCtrl'
		})
		.when('/detalleBeneficiario',{
			templateUrl:'templates/detalleBeneficiario.html',
			controller: 'DetalleBeneficiarioCtrl'
		})
		.when('/nuevoUsuario',{
			templateUrl:'templates/nuevoUsuario.html',
			controller: 'UsuarioCtrl'
		})
		.when('/detalleUsuario',{
			templateUrl:'templates/detalleUsuario.html',
			controller: 'DetalleUsuarioCtrl'
		})
		.when('/estados',{
			templateUrl:'templates/estados.html',
			controller: 'EstadoCtrl'
		})
		.when('/nuevoEstado',{
			templateUrl:'templates/nuevoEstado.html',
			controller: 'EstadoCtrl'
		})
		.when('/detalleEstado',{
			templateUrl:'templates/detalleEstado.html',
			controller: 'DetalleEstadoCtrl'
		})
		.when('/convocatorias',{
			templateUrl:'templates/convocatorias.html',
			controller: 'ConvocatoriaCtrl'
		})
		.when('/nuevaConvocatoria',{
			templateUrl:'templates/nuevaConvocatoria.html',
			controller: 'ConvocatoriaCtrl'
		})
		.when('/detalleConvocatoria',{
			templateUrl:'templates/detalleConvocatoria.html',
			controller: 'DetalleConvocatoriaCtrl'
		})
		.when('/tiposIdentificacion',{
			templateUrl:'templates/tiposIdentificacion.html',
			controller: 'TipoIdentificacionCtrl'
		})
		.when('/nuevoTipoIdentificacion',{
			templateUrl:'templates/nuevoTipoIdentificacion.html',
			controller: 'TipoIdentificacionCtrl'
		})
		.when('/detalleTipoIdentificacion',{
			templateUrl:'templates/detalleTipoIdentificacion.html',
			controller: 'DetalleTipoIdentificacionCtrl'
		})
		.when('/registroBeneficiario',{
			templateUrl:'templates/registroBeneficiario.html',
			controller: 'RegistroBeneficiarioCtrl'
		})
		.when('/dashboardBeneficiario',{
			templateUrl:'templates/dashboardBeneficiario.html',
			controller: 'DashBoardBeneficiarioCtrl'
		})
		.when('/datosPersonales',{
			templateUrl:'templates/datosPersonales.html',
			controller: 'DatosPersonalesCtrl'
		})
		.when('/datosUniversidad',{
			templateUrl:'templates/datosUniversidad.html',
			controller: 'DatosUniversidadCtrl'
		})
		.when('/datosEntidadPublica',{
			templateUrl:'templates/datosEntidadPublica.html',
			controller: 'DatosEntidadPublicaCtrl'
		})
		.when('/datosProyecto',{
			templateUrl:'templates/datosProyecto.html',
			controller: 'DatosProyectoCtrl'
		})
		.when('/cambiarCorreoAdmin',{
			templateUrl:'templates/cambiarCorreoAdmin.html',
			controller: 'CambiarCorreoCtrl'
		})
		.when('/cambiarClaveAdmin',{
			templateUrl:'templates/cambiarClaveAdmin.html',
			controller: 'CambiarClaveCtrl'
		})
		.when('/cambiarClaveBene',{
			templateUrl:'templates/cambiarClaveBene.html',
			controller: 'CambiarClaveCtrl'
		})
		.when('/cambiarClaveFun',{
			templateUrl:'templates/cambiarClaveFun.html',
			controller: 'CambiarClaveCtrl'
		})
		.when('/reportes',{
			templateUrl:'templates/reportes.html',
			controller: 'ReportesCtrl'
		})
		.when('/olvidoClave',{
			templateUrl:'templates/olvidoClave.html',
			controller: 'OlvidoClaveCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

});
