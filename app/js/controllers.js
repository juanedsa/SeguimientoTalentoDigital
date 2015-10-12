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
  ERROR,
  FB) {

  /** Para Pruebas */
  $scope.correo = 'juanedsa@gmail.com';
  $scope.clave = '123456';

	/** Funcion encargada de enviar a la pagina de registro de un beneficiario */
	$scope.irRegistroBeneficiario = function () {
   		$location.path('/registroBeneficiario');
	};

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
            console.log("El correo electrónico de cuenta de usuario especificado no es válido.");
            break;
          case "INVALID_PASSWORD":
            console.log("La contraseña de la cuenta de usuario especificada es incorrecta.");
            break;
          case "INVALID_USER":
            console.log("La cuenta de usuario especificada no existe.");
            break;
          default:
            console.log("Error de registro de usuario en:", error);
        }

        /** Se muestra un mensaje de error al usuario */
        $scope.$apply(function() {
          $scope.modal = {
            titulo: "Error",
            mensaje: ERROR.INICIAR_SESION
          };
          $('#modal-general').modal('show');
        });

      } else {

        console.log("Logeo exitoso con la siguiente información: ", authData);

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


/** Controlador para registro de los beneficiarios.*/
controladores.controller("RegistroBeneficiarioCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory,
  BeneficiariosFactory,
  TiposIdentificacionFactory,
  localStorageService,
  LOCAL_STOGARE) {

	$scope.beneficiariosArray = BeneficiariosFactory;
	$scope.tiposIdentificacionArray = TiposIdentificacionFactory;

	/** Funcion encargada de registrar un beneficiario */
	$scope.registrarBeneficiario = function () {

		console.log("Inicia [LoginBeneficiarioCtrl registrarBeneficiario]");

		$scope.beneficiariosArray.$add({
        	nombre: 								$scope.beneficiario.nombre,
        	tipoIdentificacion: 		$scope.beneficiario.tipoIdentificacion,
        	numeroIdentificacion: 	$scope.beneficiario.numeroIdentificacion,
        	correo: 								$scope.beneficiario.correo
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

            /** Se Guarda en el localStorage el correo del usuario que inicio la sesion */
            localStorageService.set(LOCAL_STOGARE.CORREO_USUARIO, $scope.beneficiario.correo);

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

  $scope.irLoginBeneficiario = function () {
    $location.path('/loginBeneficiario');
  };
});


/** Controlador para los usuarios.*/
controladores.controller("UsuarioCtrl", function (
  $scope,
  $location,
  $rootScope,
  DetalleUsuarioFactory,
  AuthFactory,
  UsuariosFactory,
  EstadosFactory,
  RolesFactory) {

	/** Se inicializan los objetos traidos de fabricas */
	$scope.usuariosArray = UsuariosFactory;
	$scope.estadosArray = EstadosFactory;
	$scope.rolesArray = RolesFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo usuarios */
	$scope.irNuevoUsuario = function(){
		console.log('irNuevoUsuario');
		$location.path('/nuevoUsuario');
	};

  $scope.irDetalleUsuario = function (usuario) {

    DetalleUsuarioFactory.set(usuario);

    $location.path('/detalleUsuario');
  };

	/** Funcion encargada de enviar a la pagina con el listado de usuarios */
	$scope.irUsuarios = function(){
		console.log('irUsuarios');
		$location.path('/usuarios');
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

      /** Se crea el usuario en FireBase*/
			AuthFactory.$createUser({
				email: 		   $scope.usuario.correo,
				password: 	 $scope.usuario.clave
			}).then(function(userData) {
				console.log("Usuario creado en firebase con el id: " + userData.uid);

        $location.path('/usuarios');
			}).catch(function(error) {error
        console.log(error);

      });

		});
	};
});

/** Controlador para los usuarios.*/
controladores.controller("DetalleUsuarioCtrl", function (
  $scope,
  $location,
  DetalleUsuarioFactory,
  EstadosFactory,
  $firebaseObject,
  RolesFactory,
  FB) {

    /** Se inicializan los objetos traidos de fabricas */
    $scope.estadosArray = EstadosFactory;
    $scope.rolesArray = RolesFactory;

    //$scope.usuarioActual = DetalleUsuarioFactory.get();

    /** Se obtiene el Key del beneficario */
    var refUsuario = new Firebase(FB.USUARIOS + "/" + DetalleUsuarioFactory.get().$id);

    /** Se hace una copia local del beneficiario */
    var syncObject = $firebaseObject(refUsuario);
    $scope.usuarioActual = syncObject;

    console.log($scope.usuarioActual);

    /** Funcion encargada de enviar a la pagina con el listado de usuarios */
    $scope.irUsuarios = function(){
      console.log('irUsuarios');
      $location.path('/usuarios');
    };

    /** funcion encargada de guardar los datos del beneficario */
    $scope.actualizarUsuario = function () {

      $scope.usuarioActual.$save().then(function() {

        $scope.modal = {
          titulo: "Mensaje",
          mensaje: "Datos el usuario guardados con exito!"
        };
        $('#modal-general').modal('show');

       }).catch(function(error) {
         alert('Error!');
       });

    };

});
