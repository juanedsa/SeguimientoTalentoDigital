var app = angular.module("SeguimientoTDApp", [
	"firebase",
	"ngRoute",
	"app.controllers",
	"app.directives",
	"app.constantes",
	"app.services"
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
		.when('/nuevoUsuario',{
			templateUrl:'templates/nuevoUsuario.html',
			controller: 'UsuarioCtrl'
		})
		.when('/estados',{
			templateUrl:'templates/estados.html',
			controller: 'EstadoCtrl'
		})
		.when('/nuevoEstado',{
			templateUrl:'templates/nuevoEstado.html',
			controller: 'EstadoCtrl'
		})
		.when('/roles',{
			templateUrl:'templates/roles.html',
			controller: 'RolCtrl'
		})
		.when('/nuevoRol',{
			templateUrl:'templates/nuevoRol.html',
			controller: 'RolCtrl'
		})
		.when('/tiposIdentificacion',{
			templateUrl:'templates/tiposIdentificacion.html',
			controller: 'TipoIdentificacionCtrl'
		})
		.when('/nuevoTipoIdentificacion',{
			templateUrl:'templates/nuevoTipoIdentificacion.html',
			controller: 'TipoIdentificacionCtrl'
		})
		.when('/loginBeneficiario',{
			templateUrl:'templates/loginBeneficiario.html',
			controller: 'LoginBeneficiarioCtrl'
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
		.otherwise({
			redirectTo: '/'
		});

});

/** Filtro para ciudades segun su departamento */
app.filter('ciudadesFitro', function () {
  return function (item, padre) {

    var tempCiudades = [];
        angular.forEach(item, function (ciudad) {

            if (angular.equals(ciudad.departamentoId, padre)) {
                tempCiudades.push(ciudad);
            }
        });

    return tempCiudades;

  };
});

/** Fabrica para la autenticacion con firebase */
app.factory("AuthFactory", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

/** Fabrica referencias FireBase */
app.factory("RefFBFactory", function(){
	var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
	return ref;
});

/** Fabrica de usuarios */
app.factory("UsuariosFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/usuarios");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de estados */
app.factory("EstadosFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/estados");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de Roles */
app.factory("RolesFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/roles");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de Tipos de Indentificación */
app.factory("TiposIdentificacionFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/tiposIdentificacion");
		return $firebaseArray(ref);
	}
]);



/**
 * Controlador para los usuarios.
 */
app.controller("UsuarioCtrl", function ($scope, $location, $rootScope, RefFBFactory, UsuariosFactory,EstadosFactory,RolesFactory) {

	/** Se inicializan los objetos traidos de fabricas */
	$scope.usuariosArray = UsuariosFactory;
	$scope.estadosArray = EstadosFactory;
	$scope.rolesArray = RolesFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo usuarios */
	$scope.irNuevoUsuario = function(){
		console.log('irNuevoUsuario');
		$location.path('/nuevoUsuario');
	};

	/** Funcion encargada de crear un nuevo usuario*/
	$scope.crearUsuario = function(){

		console.log("Creando Usuario");

		$scope.usuariosArray.$add({
        	nombre: $scope.usuario.nombre,
        	correo: $scope.usuario.correo,
        	rol: 		$scope.usuario.rol,
        	estado: $scope.usuario.estado
      	}).then(function(ref) {
		  var id = ref.key();
		  console.log("Usuario Agregado con el id " + id);
		  $scope.usuariosArray.$indexFor(id); // returns location in the array

		  $location.path('/usuarios');

		});
	};
});



/**
 * Controlador para los estados.
 */
app.controller("EstadoCtrl", function ($scope, $location, $rootScope, EstadosFactory) {

	$scope.estadosArray = EstadosFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo estado */
	$scope.irNuevoEstado = function(){
		console.log('irNuevoEstado');
		$location.path('/nuevoEstado');
	};

	/** Funcion encargada de crear un nuevo estado*/
	$scope.crearEstado = function(){

		console.log("Creando Estado");

		$scope.estadosArray.$add({
        	nombre: 			$scope.estado.nombre,
        	descripcion: 	$scope.estado.descripcion
      	}).then(function(ref) {
		  var id = ref.key();
		  console.log("Estado agreado con el id: " + id);
		  $scope.estadosArray.$indexFor(id); // returns location in the array

			/** Se envia al listado de estados */
		  $location.path('/estados');

		});
	};
});

/**
 * Controlador para los Roles.
 */
app.controller("RolCtrl", function ($scope, $location, $rootScope, RolesFactory) {

	$scope.rolesArray = RolesFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo rol */
	$scope.irNuevoRol = function(){
		console.log('irNuevoRol');
		$location.path('/nuevoRol');
	};

	/** Funcion encargada de crear un nuevo rol*/
	$scope.crearRol = function(){

		console.log("Creando Rol");

		$scope.rolesArray.$add({
        	nombre: 			$scope.rol.nombre,
        	descripcion: 	$scope.rol.descripcion
      	}).then(function(ref) {
		  var id = ref.key();
		  console.log("Rol insertado con el id: " + id);
		  $scope.rolesArray.$indexFor(id); // returns location in the array

		  $location.path('/roles');
		/*  $rootScope.$apply(function() {

		  	$location.path('/usuarios');
		    console.log($location.path());
		   });*/

		});
	};
});

/**
 * Controlador para los Tipos de Indetificación.
 */
app.controller("TipoIdentificacionCtrl", function ($scope, $location, $rootScope, TiposIdentificacionFactory) {

	$scope.tiposIdentificacionArray = TiposIdentificacionFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo Tipo de Indentificación */
	$scope.irNuevoTipoIdentificacion = function(){
		console.log('irNuevoTipoIdentificacion');
		$location.path('/nuevoTipoIdentificacion');
	};

	/** Funcion encargada de crear un nuevo Tipo de Identificacion*/
	$scope.crearTipoIdentificacion = function(){

		console.log("Creando Tipo de Identificacion");

		$scope.tiposIdentificacionArray.$add({
        	nombre: 			$scope.tipoIdentificacion.nombre,
        	descripcion: 	$scope.tipoIdentificacion.descripcion
      	}).then(function(ref) {
		  var id = ref.key();
		  console.log("Tipo de Indentificación insertado con el id: " + id);
		  $scope.tiposIdentificacionArray.$indexFor(id); // returns location in the array

		  $location.path('/tiposIdentificacion');

		});
	};
});

/**
 *  Controlador para login.
 */
app.controller("LoginCtrl", function ($scope, $location, $rootScope) {

	/**
	 *  Para Pruebas
	 */
	$scope.correo = 'admin@admin.com';
	$scope.clave = 'admin';

	$scope.redirectToDraftPage= function () {

   		$location.path('/usuarios');

	};


	$scope.login = function(){

		console.log($scope.correo);

		var refAuth = new Firebase("https://seguimientotalentodigital.firebaseio.com/");

		refAuth.authWithPassword({
		  email    : $scope.correo,
		  password : $scope.clave
		}, function(error, authData) {
		  if (error) {
		    switch (error.code) {
		      case "INVALID_EMAIL":
		        console.log("The specified user account email is invalid.");
		        break;
		      case "INVALID_PASSWORD":
		        console.log("The specified user account password is incorrect.");
		        break;
		      case "INVALID_USER":
		        console.log("The specified user account does not exist.");
		        break;
		      default:
		        console.log("Error logging user in:", error);
		    }
		  } else {


		  	//$location.path('/usuarios');
		    console.log("Authenticated successfully with payload:", authData);

		    $rootScope.$apply(function() {

		        $location.path('/usuarios');
		        console.log($location.path());
		      });


		  }
		});
	}
});
