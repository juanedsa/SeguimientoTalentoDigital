var controladores = angular.module('app.controllers', [
  "LocalStorageModule"
]);

/** Controlador para el dashboard del beneficiario. */
controladores.controller("DashBoardBeneficiarioCtrl", function (
  $scope,
  $location) {

  /** Funcion encargada de enviar a la pagina de datos personales */
  $scope.irDatosPersonales = function () {
    $location.path('/datosPersonales');
  };

  /** Funcion encargada de enviar a la pagina de datos de la universidad */
  $scope.irDatosUniversidad = function () {
    $location.path('/datosUniversidad');
  };

  /** Funcion encargada de enviar a la pagina de datos de la entidad publica */
  $scope.irDatosEntidadPublica = function () {
    $location.path('/datosEntidadPublica');
  };

  /** Funcion encargada de enviar a la pagina de datos del proyecto */
  $scope.irDatosProyecto = function () {
    $location.path('/datosProyecto');
  };
});

/** Controlador para los Beneficiarios. */
controladores.controller("BeneficiarioCtrl", function (
  $scope,
  BeneficiariosFactory) {

	/** Se inicializan los objetos traidos de fabricas */
	$scope.beneficiariosArray = BeneficiariosFactory;

});

/** Controlador para los datos personales del Beneficiario */
controladores.controller('DatosPersonalesCtrl', function (
  $scope,
  $location,
  $firebaseObject,
  localStorageService,
  TiposIdentificacionFactory,
  DepartamentosFactory,
  CiudadesFactory,
  ConvocatoriasFactory,
  LOCAL_STOGARE,
  FB) {

  /** Se inicializa el material desing */
  angular.element(document).ready(function () {
      $.material.init();
  });

  /** Se obtienen los tipos de documento */
	$scope.tiposIdentificacionArray = TiposIdentificacionFactory;
  /** Se obtienen departamentos */
  $scope.departamentosList = DepartamentosFactory.all();
  /** Se obtienen ciudades */
  $scope.ciudadesList = CiudadesFactory.all();
  /** Se obtienen Convocatorias */
  $scope.convocatoriasList = ConvocatoriasFactory.all();

  /** Se obtiene el correo del usuario que esta en la sesion */
  var correoUsuario = localStorageService.get(LOCAL_STOGARE.CORREO_USUARIO);

  var ref = new Firebase(FB.BENEFICIARIOS);
  ref.orderByChild("correo").equalTo(correoUsuario).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        /** Se obtiene el Key del beneficario */
        var key = childSnapshot.key();
        var refBen = new Firebase(FB.BENEFICIARIOS + "/" + key );

        /** Se hace una copia local del usuario */
        var syncObject = $firebaseObject(refBen);
        $scope.usuarioActual = syncObject;

      });
    });


  /** funcion encargada de guardar los datos del beneficario */
  $scope.guardarDatos = function () {

    $scope.usuarioActual.$save().then(function() {
      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Datos Personales Guardados con Exito"
      };


      $('#modal-general').modal('show');
     }).catch(function(error) {
       alert('Error!');
     });

  };

  $scope.irDashBoardBeneficiario = function () {
    $location.path('/dashboardBeneficiario');
  };

});

/** Controlador para los datos de la universidad del Beneficiario */
controladores.controller('DatosUniversidadCtrl', function (
  $scope,
  $location,
  $firebaseObject,
  localStorageService,
  DepartamentosFactory,
  CiudadesFactory,
  SemestresFactory,
  NivelFormacionFactory,
  LOCAL_STOGARE,
  FB) {

  /** Se inicializa el material desing */
  angular.element(document).ready(function () {
      $.material.init();
  });

  /** Se obtienen departamentos */
  $scope.departamentosList = DepartamentosFactory.all();
  /** Se obtienen ciudades */
  $scope.ciudadesList = CiudadesFactory.all();
  /** Se obtienen los semestres */
  $scope.semestreList = SemestresFactory.all();
  /** Se obtienen niveles de formacion */
  $scope.nivelFormacionList = NivelFormacionFactory.all();


  /** Se obtiene el correo del usuario que esta en la sesion */
  var correoUsuario = localStorageService.get(LOCAL_STOGARE.CORREO_USUARIO);

  var ref = new Firebase(FB.BENEFICIARIOS);
  ref.orderByChild("correo").equalTo(correoUsuario).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        /** Se obtiene el Key del beneficario */
        var key = childSnapshot.key();
        var refBen = new Firebase(FB.BENEFICIARIOS + "/" + key + "/datosUniversidad");

        /** Se hace una copia local del usuario */
        var syncObject = $firebaseObject(refBen);
        $scope.datosUniversidad = syncObject;

      });
    });


  /** funcion encargada de guardar los datos del beneficario */
  $scope.guardarDatos = function () {

    $scope.datosUniversidad.$save().then(function() {
      //  alert('Profile saved!');

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Datos Guardados con Exito"
      };

      $('#modal-general').modal('show');


     }).catch(function(error) {
       alert('Error!');
     });

  };

  $scope.irDashBoardBeneficiario = function () {
    $location.path('/dashboardBeneficiario');
  };

});

/** Controlador para los datos de la entidad publica del Beneficiario */
controladores.controller('DatosEntidadPublicaCtrl', function (
  $scope,
  $location,
  $firebaseObject,
  localStorageService,
  DepartamentosFactory,
  CiudadesFactory,
  LOCAL_STOGARE,
  FB) {

    /** Se inicializa el material desing */
    angular.element(document).ready(function () {
        $.material.init();
    });

  /** Se obtienen departamentos */
  $scope.departamentosList = DepartamentosFactory.all();
  /** Se obtienen ciudades */
  $scope.ciudadesList = CiudadesFactory.all();

  /** Se obtiene el correo del usuario que esta en la sesion */
  var correoUsuario = localStorageService.get(LOCAL_STOGARE.CORREO_USUARIO);

  var ref = new Firebase(FB.BENEFICIARIOS);
  ref.orderByChild("correo").equalTo(correoUsuario).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        /** Se obtiene el Key del beneficario */
        var key = childSnapshot.key();
        console.log("key");
        console.log(key);
        var refBen = new Firebase(FB.BENEFICIARIOS + "/" + key + "/datosEntidadPublica");

        /** Se hace una copia local del beneficiario */
        var syncObject = $firebaseObject(refBen);
        $scope.datosEntidadPublica = syncObject;

      });
    });


  /** funcion encargada de guardar los datos del beneficario */
  $scope.guardarDatos = function () {

    $scope.datosEntidadPublica.$save().then(function() {

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Datos de la entidad publica guardados con exito!"
      };
      $('#modal-general').modal('show');

     }).catch(function(error) {
       alert('Error!');
     });

  };

  $scope.irDashBoardBeneficiario = function () {
    $location.path('/dashboardBeneficiario');
  };

});

/** Controlador para los datos del proyecto del Beneficiario */
controladores.controller('DatosProyectoCtrl', function (
  $scope,
  $location,
  $firebaseObject,
  localStorageService,
  AvanceFactory,
  LOCAL_STOGARE,
  FB) {

  /** Se inicializa el material desing */
  angular.element(document).ready(function () {
      $.material.init();
  });

  /** Se obtienen lista de avance */
  $scope.avanceList = AvanceFactory.all();

  /** Se obtiene el correo del usuario que esta en la sesion */
  var correoUsuario = localStorageService.get(LOCAL_STOGARE.CORREO_USUARIO);

  var ref = new Firebase(FB.BENEFICIARIOS);
  ref.orderByChild("correo").equalTo(correoUsuario).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        /** Se obtiene el Key del beneficario */
        var key = childSnapshot.key();
        var refBen = new Firebase(FB.BENEFICIARIOS + "/" + key + "/datosProyecto");

        /** Se hace una copia local del beneficiario */
        var syncObject = $firebaseObject(refBen);
        $scope.datosProyecto = syncObject;

      });
    });


  /** funcion encargada de guardar los datos del beneficario */
  $scope.guardarDatos = function () {

    $scope.datosProyecto.$save().then(function() {

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Datos del proyecto guardados con exito!"
      };
      $('#modal-general').modal('show');

     }).catch(function(error) {
       alert('Error!');
     });

  };

  $scope.irDashBoardBeneficiario = function () {
    $location.path('/dashboardBeneficiario');
  };

});


/** Controlador para login de los beneficiarios. */
controladores.controller("LoginBeneficiarioCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory,
  localStorageService,
  LOCAL_STOGARE,
  FB) {

	/** Funcion encargada de enviar a la pagina de registro de un beneficiario */
	$scope.irRegistroBeneficiario = function () {
   		$location.path('/registroBeneficiario');
	};

  /** Para Pruebas */
  $scope.correo = 'juanedsa@gmail.com';
  $scope.clave = '123456';

  /** Funcion encargada de hacer el login */
  $scope.login = function(){

    var refAuth = new Firebase(FB.APP);

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

        /** Se Guarda en el localStorage el correo del usuario que inicio la sesion */
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
