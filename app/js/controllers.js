var controladores = angular.module('app.controllers', [
  "LocalStorageModule"
]);

/** Controlador para el dashboard del beneficiario. */
controladores.controller("DashBoardBeneficiarioCtrl", function (
  $scope,
  localStorageService,
  LOCAL_STOGARE,
  $location) {

  $scope.nombreBeneficiario = localStorageService.get(LOCAL_STOGARE.NOMBRE_USUARIO);

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
  $location,
  BeneficiariosFactory,
  DetalleBeneficiarioFactory) {

  /** Se inicializa el material desing */
  angular.element(document).ready(function () {
      $.material.init();
  });

	/** Se inicializan los objetos traidos de fabricas */
	$scope.beneficiariosArray = BeneficiariosFactory;

  $scope.irDetalleBeneficiario = function (beneficiario) {
    console.log(beneficiario.$id);
    console.log(beneficiario);

    DetalleBeneficiarioFactory.set(beneficiario);

    $location.path('/detalleBeneficiario');
  };

  /** Funcion encargada de ordenar la lista */
  $scope.ordenarPor = function(orden) {
    $scope.ordenSeleccionado = orden;
  };

});

/** Controlador para el detalle del Beneficiario. */
controladores.controller("DetalleBeneficiarioCtrl", function (
  $scope,
  $location,
  TiposIdentificacionFactory,
  DepartamentosFactory,
  DetalleBeneficiarioFactory) {

    /** Se inicializa el material desing */
    angular.element(document).ready(function () {
        $.material.init();
    });

  $scope.beneficiario = DetalleBeneficiarioFactory.get();

  $scope.tiposIdentificacionArray = TiposIdentificacionFactory;

  $scope.beneficiario.departamento = DepartamentosFactory.getIndex($scope.beneficiario.departamento);

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
  $scope.convocatoriasList = ConvocatoriasFactory;

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


/** Controlador para login. */
controladores.controller("LoginCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory,
  localStorageService,
  LOCAL_STOGARE,
  RolesUsuarioFactory,
  BeneficiariosFactory,
  ROL,
  ADMIN,
  ERROR,
  FB) {

  /** Para Pruebas */
  $scope.correo = "admin@admin.com";
  $scope.clave = 'admin';

	$scope.rolesUsuarioArray = RolesUsuarioFactory;
  $scope.beneficiariosArray = BeneficiariosFactory;

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

        /** Se verifica si es el administrador del sistema */
        if (angular.equals(ADMIN.UID, authData.uid)) {
            console.log("Login Administrador");

            /** Se envia la pagina principal del administrador */
            $rootScope.$apply(function() {
                $location.path('/usuarios');
                console.log($location.path());
            });
        }else{

            var rolesUsuario = $scope.rolesUsuarioArray;

            angular.forEach(rolesUsuario, function (rolUsuario) {

              console.log(rolUsuario);
              console.log(authData.uid);

                if (angular.equals(rolUsuario.uid, authData.uid)) {

                  console.log("Iguales");

                    if (angular.equals(rolUsuario.rol, ROL.FUNCIONARIO)) {

                      console.log("Usuario Funcionario");

                      /** Se envia al usuario a la pagina principal del rol funcionario*/
                      $rootScope.$apply(function() {
                          $location.path('/beneficiarios');
                          console.log($location.path());
                      });

                    }else{

                        console.log("Usuario Beneficiario");

                        var beneficiarios = $scope.beneficiariosArray;

                        angular.forEach(beneficiarios, function (beneficario) {

                            if (angular.equals(beneficario.correo, $scope.correo)) {

                              /** Se Guarda en el localStorage el nombre del usuario que inicio la sesion */
                              localStorageService.set(LOCAL_STOGARE.NOMBRE_USUARIO, beneficario.nombre);

                              /** Se envia al usuario a la pagina de dashboard */
                              $rootScope.$apply(function() {
                                  $location.path('/dashboardBeneficiario');
                                  console.log($location.path());
                              });

                            }
                        });

                    }
                }
            });
        }
      }
    });
  }
});

/** Controlador para Cambio de correo. */
controladores.controller("CambiarCorreoCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory) {

    $scope.cambiarCorreo = function () {
        AuthFactory.$changeEmail({
          oldEmail: $scope.correoActual,
          newEmail: $scope.correoNuevo,
          password: $scope.claveActual
        }).then(function() {
          console.log("Correo cambiado con exito");

          $scope.modal = {
            titulo: "Mensaje",
            mensaje: "Correo cambiado con exito"
          };
          $('#modal-general').modal('show');

          /** Funcion que se ejecuta cuando se oculta el modal */
          $('#modal-general').on('hidden.bs.modal', function (e) {

            $rootScope.$apply(function() {
                $location.path('/');
            });
          });

        }).catch(function(error) {
            var errorMensaje;
            console.log("code", error.code);
            switch (error.code) {

              case "INVALID_EMAIL":
                errorMensaje = "El correo electrónico de cuenta de usuario especificado no es válido.";
                console.log(errorMensaje);
                break;
              case "INVALID_PASSWORD":
                errorMensaje = "La contraseña de la cuenta de usuario especificada es incorrecta.";
                console.log(errorMensaje);
                break;
              case "INVALID_USER":
                var errorMensaje = "La cuenta de usuario especificada no existe.";
                console.log(errorMensaje);
                break;
              case "EMAIL_TAKEN":
                var errorMensaje = "La dirección de correo electrónico especificada ya está en uso.";
                console.log(errorMensaje);
                break;
              default:
                var errorMensaje = "Error cambiando correo.";
                console.log(errorMensaje, error);
            }

            $scope.modal = {
              titulo: "Mensaje",
              mensaje: errorMensaje
            };
            $('#modal-general').modal('show');
        });
    };
});

/** Controlador para Cambio de clave. */
controladores.controller("CambiarClaveCtrl", function (
  $scope,
  $location,
  $rootScope,
  AuthFactory) {

    $scope.cambiarClave = function () {

      AuthFactory.$changePassword({
        email: $scope.correoActual,
        oldPassword: $scope.claveActual,
        newPassword: $scope.claveNueva
      }).then(function() {
        console.log("Clave cambiada con exito");

        $scope.modal = {
          titulo: "Mensaje",
          mensaje: "Clave cambiada con exito"
        };
        $('#modal-general').modal('show');

        /** Funcion que se ejecuta cuando se oculta el modal */
        $('#modal-general').on('hidden.bs.modal', function (e) {

          $rootScope.$apply(function() {
              $location.path('/');
          });
        });
      }).catch(function(error) {
            var errorMensaje;
            console.log("code", error.code);
            switch (error.code) {

              case "INVALID_EMAIL":
                errorMensaje = "El correo electrónico de cuenta de usuario especificado no es válido.";
                console.log(errorMensaje);
                break;
              case "INVALID_PASSWORD":
                errorMensaje = "La contraseña de la cuenta de usuario especificada es incorrecta.";
                console.log(errorMensaje);
                break;
              case "INVALID_USER":
                var errorMensaje = "La cuenta de usuario especificada no existe.";
                console.log(errorMensaje);
                break;
              case "EMAIL_TAKEN":
                var errorMensaje = "La dirección de correo electrónico especificada ya está en uso.";
                console.log(errorMensaje);
                break;
              default:
                var errorMensaje = "Error cambiando correo.";
                console.log(errorMensaje, error);
            }

            $scope.modal = {
              titulo: "Mensaje",
              mensaje: errorMensaje
            };
            $('#modal-general').modal('show');
        });
    };
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

  $scope.irLogin = function () {
    $location.path('/');
  };
});


/** Controlador para los usuarios.*/
controladores.controller("UsuarioCtrl", function (
  $scope,
  $location,
  $rootScope,
  $firebaseObject,
  $firebaseAuth,
  RolesUsuarioFactory,
  DetalleUsuarioFactory,
  AuthFactory,
  UsuariosFactory,
  EstadosFactory,
  RolesFactory,
  ROL) {

	/** Se inicializan los objetos traidos de fabricas */
	$scope.usuariosArray = UsuariosFactory;
	$scope.estadosArray = EstadosFactory;
	$scope.rolesUsuarioArray = RolesUsuarioFactory;
	$scope.rolesArray = RolesFactory.all();

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

  /** Funcion en cargada de eliminar un usuario */
  $scope.eliminarUsuario = function (usuario) {

      /** Se almacena el usuario que se va a elmiminar */
      $scope.usuarioParaEliminar = usuario;

      /** Se muestra un mensaje para pedir confirmacion */
      $scope.modalConfirmacion = {
          titulo: "Confirmación",
          mensaje: "¿Esta seguro que desea eliminar el usuario?"
      };

      $('#modal-confirmacion').modal('show');

  };

	/** Funcion encargada de crear un nuevo usuario*/
  $scope.crearUsuario = function(){
    console.log("Creando Usuario");

		$scope.usuariosArray.$add({
        	nombre: $scope.usuario.nombre,
        	correo: $scope.usuario.correo,
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

          $scope.rolesUsuarioArray.$add({
                uid:    userData.uid,
                rol:    ROL.FUNCIONARIO
          }).then(function(ref) {
            var id = ref.key();
            console.log("Rol agregado a usuario con el id " + id);

          $location.path('/usuarios');
  			}).catch(function(error) {error
          console.log(error);

        });
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
    $scope.rolesArray = RolesFactory.all();

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



/** Controlador para los estados. */
controladores.controller("EstadoCtrl", function (
  $scope,
  $location,
  EstadosFactory,
  DetalleEstadoFactory) {

	$scope.estadosArray = EstadosFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo estado */
	$scope.irNuevoEstado = function(){
		console.log('irNuevoEstado');
		$location.path('/nuevoEstado');
	};

	/** Funcion encargada de enviar a la pagina con el listado de estados*/
	$scope.irEstados = function(){
		console.log('irEstados');
		$location.path('/estados');
	};

	/** Funcion encargada de crear un nuevo estado*/
	$scope.crearEstado = function(){

		console.log("Creando Estado");

		$scope.estadosArray.$add({
          id:           $scope.estadosArray.length + 1,
        	nombre: 			$scope.estado.nombre,
        	descripcion: 	$scope.estado.descripcion
    }).then(function(ref) {
		  var id = ref.key();
		  console.log("Estado agreado con el id: " + id);

			/** Se envia al listado de estados */
		  $location.path('/estados');

		});
	};

  $scope.irDetalleEstado = function (estado) {

    DetalleEstadoFactory.set(estado);
    $location.path('/detalleEstado');
  };


});

/** Controlador para el detalle de un Estado. */
controladores.controller("DetalleEstadoCtrl", function (
  $scope,
  $location,
  $rootScope,
  EstadosFactory,
  DetalleEstadoFactory,
  $firebaseObject,
  FB) {

	$scope.estadosArray = EstadosFactory;

  /** Se obtiene la referencia al estado */
  var refEstado = new Firebase(FB.ESTADOS + "/" + DetalleEstadoFactory.get().$id);

  /** Se hace una copia local del estado */
  var syncObject = $firebaseObject(refEstado);
  $scope.detalleEstado = syncObject;


  /** Funcion encargada de guardar el estado */
  $scope.guardarEstado = function () {

    $scope.detalleEstado.$save().then(function() {

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Estado guardado con exito!"
      };
      $('#modal-general').modal('show');

      /** Funcion que se ejecuta cuando se oculta el modal */
      $('#modal-general').on('hidden.bs.modal', function (e) {

        $rootScope.$apply(function() {
            $location.path('/estados');
        });
      });

     }).catch(function(error) {
       alert('Error!');
     });


  };

  /** Funcion encargada de enviar a la pagina con el listado de estados*/
  $scope.irEstados = function(){
    console.log('irEstados');
    $location.path('/estados');
  };


});

/** Controlador para los convocatorias. */
controladores.controller("ConvocatoriaCtrl", function (
  $scope,
  $location,
  ConvocatoriasFactory,
  DetalleConvocatoriaFactory) {

	$scope.convocatoriasArray = ConvocatoriasFactory;

	/** Funcion encargada de enviar a la pagina para crear un nueva convocatoria */
	$scope.irNuevaConvocatoria = function(){
		console.log('irNuevaConvocatoria');
		$location.path('/nuevaConvocatoria');
	};

	/** Funcion encargada de enviar a la pagina con el listado de convocatorias*/
	$scope.irConvocatorias = function(){
		console.log('irConvocatorias');
		$location.path('/convocatorias');
	};

	/** Funcion encargada de crear un nueva convocatoria*/
	$scope.crearConvocatoria = function(){

		console.log("Creando Convocatoria");

		$scope.convocatoriasArray.$add({
          id:           $scope.convocatoriasArray.length + 1,
        	nombre: 			$scope.convocatoria.nombre,
        	descripcion: 	$scope.convocatoria.descripcion
    }).then(function(ref) {
		  var id = ref.key();
		  console.log("Convocatoria creada con el id: " + id);

			/** Se envia al listado de estados */
		  $location.path('/convocatorias');

		});
	};

  $scope.irDetalleConvocatoria = function (convocatoria) {

    DetalleConvocatoriaFactory.set(convocatoria);
    $location.path('/detalleConvocatoria');
  };


});

/** Controlador para el detalle de un Estado. */
controladores.controller("DetalleConvocatoriaCtrl", function (
  $scope,
  $location,
  $rootScope,
  ConvocatoriasFactory,
  DetalleConvocatoriaFactory,
  $firebaseObject,
  FB) {

  /** Se obtiene la referencia a la convocatoria */
  var refConvocatoria = new Firebase(FB.CONVOCATORIAS + "/" + DetalleConvocatoriaFactory.get().$id);

  /** Se hace una copia local del estado */
  var syncObject = $firebaseObject(refConvocatoria);
  $scope.detalleConvocatoria = syncObject;


  /** Funcion encargada de guardar la convocatoria */
  $scope.guardarConvocatoria = function () {

    $scope.detalleConvocatoria.$save().then(function() {

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Convocatoria guardada con exito!"
      };
      $('#modal-general').modal('show');

      /** Funcion que se ejecuta cuando se oculta el modal */
      $('#modal-general').on('hidden.bs.modal', function (e) {

        $rootScope.$apply(function() {
            $location.path('/convocatorias');
        });
      });

     }).catch(function(error) {
       alert('Error!');
     });


  };

  /** Funcion encargada de enviar a la pagina con el listado de convocatorias*/
  $scope.irConvocatorias = function(){
    console.log('irConvocatorias');
    $location.path('/convocatorias');
  };


});

/** Controlador para los Tipos de Indetificación. */
controladores.controller("TipoIdentificacionCtrl", function (
  $scope,
  $location,
  $rootScope,
  TiposIdentificacionFactory,
  DetalleTipoIndetificacionFactory) {

	$scope.tiposIdentificacionArray = TiposIdentificacionFactory;

	/** Funcion encargada de enviar a la pagina para crear un nuevo Tipo de Indentificación */
	$scope.irNuevoTipoIdentificacion = function(){
		console.log('irNuevoTipoIdentificacion');
		$location.path('/nuevoTipoIdentificacion');
	};

	/** Funcion encargada de enviar a la pagina con el listado de Tipos de Indentificación */
	$scope.irTiposIdentificacion = function(){
		console.log('irTiposIdentificacion');
		$location.path('/tiposIdentificacion');
	};

	/** Funcion encargada de enviar a la pagina con el listado de Tipos de Indentificación */
	$scope.irDetalle = function(tipoIdentificacion){

    DetalleTipoIndetificacionFactory.set(tipoIdentificacion);
		$location.path('/detalleTipoIdentificacion');
	};

	/** Funcion encargada de crear un nuevo Tipo de Identificacion*/
	$scope.crearTipoIdentificacion = function(){

		console.log("Creando Tipo de Identificacion");

		$scope.tiposIdentificacionArray.$add({
          id:           $scope.tiposIdentificacionArray.length + 1,
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

/** Controlador para el detalle de un Tipo de Identificacion. */
controladores.controller("DetalleTipoIdentificacionCtrl", function (
  $scope,
  $location,
  $rootScope,
  TiposIdentificacionFactory,
  DetalleTipoIndetificacionFactory,
  $firebaseObject,
  FB) {

  /** Se obtiene la referencia al tipo de Identificacion */
  var refTipoIdentificacion = new Firebase(FB.TIPOS_IDENTIFICACION + "/" + DetalleTipoIndetificacionFactory.get().$id);

  /** Se hace una copia local del tipo de Identificacion */
  var syncObject = $firebaseObject(refTipoIdentificacion);
  $scope.detalleTipoIdentificacion = syncObject;

  /** Funcion encargada de guardar el Tipo de Identificacion */
  $scope.guardarTipoIdentificacion = function () {

    console.log("Inicia guardarTipoIdentificacion");

    $scope.detalleTipoIdentificacion.$save().then(function() {

      $scope.modal = {
        titulo: "Mensaje",
        mensaje: "Tipo de Indentificación guardado con exito!"
      };
      $('#modal-general').modal('show');

      /** Funcion que se ejecuta cuando se oculta el modal */
      $('#modal-general').on('hidden.bs.modal', function (e) {

        $rootScope.$apply(function() {
            $location.path('/tiposIdentificacion');
        });
      });

     }).catch(function(error) {
       alert('Error!');
     });


  };

  /** Funcion encargada de enviar a la pagina con el listado de Tipos de Identificacion*/
  $scope.irTiposIdentificacion = function(){
    console.log('irTiposIdentificacion');
    $location.path('/tiposIdentificacion');
  };


});
