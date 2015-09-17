var app = angular.module("SeguimientoTDApp", ["firebase", "ngRoute"]);

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
		.otherwise({
			redirectTo: '/'
		});

});

app.factory("AuthFactory", function($firebaseAuth){

	var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
	return ref;

});

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

/**
 * Controlador para los usuarios.
 */
app.controller("UsuarioCtrl", function ($scope, $location, $rootScope, RefFBFactory, UsuariosFactory) {

	$scope.usuariosArray = UsuariosFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo usuarios */
	$scope.irNuevoUsuario = function(){
		console.log('irNuevoUsuario');
		$location.path('/nuevoUsuario');
	};

	/** Funcion encargada de crear un nuevo usuario*/
	$scope.crearUsuario = function(){

		console.log("Creando Usuario");

		$scope.usuariosArray.$add({
        	nombre: $scope.usuario.nombre
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

app.controller("LoginCtrl", function ($scope, $location, $rootScope, AuthFactory) {

	$scope.redirectToDraftPage= function () {

   $location.path('/usuarios');

};


	$scope.login = function(){

		console.log($scope.correo);

		AuthFactory.authWithPassword({
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