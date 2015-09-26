var app = angular.module("SeguimientoTDApp", ["firebase", "ngRoute"]);

/** Directiva barra de navegacion superior */
app.directive('barraNavegacion', function () {
	return{
		restrict: 'E',
		templateUrl: 'templates/barra-navegacion.html'
	}
});

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
			controller: 'RegistroBeneficiarioCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

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

/** Fabrica de Beneficiarios */
app.factory("BeneficiariosFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/beneficiarios");
		return $firebaseArray(ref);
	}
]);

/**
 * Controlador para los usuarios.
 */
app.controller("UsuarioCtrl", function ($scope, $location, $rootScope, RefFBFactory, UsuariosFactory,EstadosFactory) {

	$scope.usuariosArray = UsuariosFactory;
	$scope.estadosArray = EstadosFactory;

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
		  console.log("added record with id " + id);
		  $scope.usuariosArray.$indexFor(id); // returns location in the array

		  $location.path('/usuarios');
		/*  $rootScope.$apply(function() {

		  	$location.path('/usuarios');
		    console.log($location.path());
		   });*/

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
		  console.log("added record with id " + id);
		  $scope.estadosArray.$indexFor(id); // returns location in the array

		  $location.path('/estados');
		/*  $rootScope.$apply(function() {

		  	$location.path('/usuarios');
		    console.log($location.path());
		   });*/

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


/**
 *  Controlador para login de los beneficiarios.
 */
app.controller("LoginBeneficiarioCtrl", function ($scope, $location, $rootScope, AuthFactory) {

	/** Funcion encargada de enviar a la pagina de registro de un beneficiario */
	$scope.irRegistroBeneficiario= function () {

   		$location.path('/registroBeneficiario');

	};



});




/**
 *  Controlador para registro de los beneficiarios.
 */
app.controller("RegistroBeneficiarioCtrl", function ($scope, $location, $rootScope, AuthFactory, BeneficiariosFactory) {

	$scope.beneficiariosArray = BeneficiariosFactory;

	/** Funcion encargada de registrar un beneficiario */
	$scope.registrarBeneficiario = function () {

		console.log("Inicia [LoginBeneficiarioCtrl registrarBeneficiario]");

		$scope.beneficiariosArray.$add({
        	nombre: 				$scope.beneficiario.nombre,
        	tipoIdentificacion: 	$scope.beneficiario.tipoIdentificacion,
        	numeroIdentificacion: 	$scope.beneficiario.numeroIdentificacion,
        	correo: 				$scope.beneficiario.correo
      	}).then(function(ref) {
			var id = ref.key();
			console.log("Beneficiario agregado con el  id " + id);
			$scope.beneficiariosArray.$indexFor(id); // returns location in the array

			/** Se crea el usuario */
			AuthFactory.$createUser({
				email: 		$scope.beneficiario.correo,
				password: 	$scope.beneficiario.clave
			}).then(function(userData) {
				console.log("Usuario creado con el id: " + userData.uid);

				var refAuth = new Firebase("https://seguimientotalentodigital.firebaseio.com/");

				refAuth
				.authWithPassword({
				  email    : $scope.beneficiario.correo,
				  password : $scope.beneficiario.clave
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

				    console.log("Usuario inicio sesion con exito");

				    /** Se envia al usuario a la pagina de dashboard */
				    $rootScope.$apply(function() {
				        $location.path('/dashboardBeneficiario');
				        console.log($location.path());
				    });
				  }
				});


			}).catch(function(error) {
				console.log("ERROR: al crear usuario " + error);
			});
		});
	};
});
