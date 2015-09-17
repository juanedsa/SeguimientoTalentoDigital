var app = angular.module("SeguimientoTDApp", ["firebase", "ngRoute"]);

/** Configuracion de la app */
app.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/',{
			templateUrl:'templates/login.html',
			controller: 'LoginCtrl'
		})
		.when('/usuarios',{
			templateUrl:'templates/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		});

});

app.factory("AuthFactory", function($firebaseAuth){

	var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
	return ref;

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