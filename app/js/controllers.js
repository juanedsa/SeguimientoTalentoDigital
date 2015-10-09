var controladores = angular.module('app.controllers', [
  "LocalStorageModule"
]);

/** Controlador para los datos personales del Beneficiario */
controladores.controller('DatosPersonalesCtrl', function (
  $scope,
  BeneficiariosFactory,
  localStorageService,
  TiposIdentificacionFactory,
  LOCAL_STOGARE,
  FB) {

	$scope.tiposIdentificacionArray = TiposIdentificacionFactory;

  var correoUsuario = localStorageService.get(LOCAL_STOGARE.CORREO_USUARIO);

  var ref = new Firebase(FB.BENEFICIARIOS);

  ref.orderByChild("correo").equalTo(correoUsuario).on("child_added", function(snapshot) {
    console.log(snapshot.key());
    console.log(snapshot.val());

    var usuario = snapshot.val();
    $scope.nombre = usuario.nombre;
    $scope.numeroIdentificacion = usuario.numeroIdentificacion;
    $scope.correo = usuario.correo;
    $scope.tipoIdentificacion = usuario.tipoIdentificacion.id;
  });

});


/** Controlador para login de los beneficiarios. */
controladores.controller("LoginBeneficiarioCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory,
  localStorageService,
  LOCAL_STOGARE) {

	/** Funcion encargada de enviar a la pagina de registro de un beneficiario */
	$scope.irRegistroBeneficiario= function () {
   		$location.path('/registroBeneficiario');
	};

  /** Para Pruebas */
  $scope.correo = 'juanedsa@gmail.com';
  $scope.clave = '123456';

  /** Funcion encargada de hacer el login */
  $scope.login = function(){

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

        console.log("Authenticated successfully with payload:", authData);

        localStorageService.set(LOCAL_STOGARE.CORREO_USUARIO, $scope.correo);
        /** Se envia al usuario a la pagina de dashboard */
        $rootScope.$apply(function() {
            $location.path('/dashboardBeneficiario');
            console.log($location.path());
        });
      }
    });
  }



});
