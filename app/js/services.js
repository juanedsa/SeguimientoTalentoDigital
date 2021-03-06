var services = angular.module('app.services', []);

/** Fabrica de detalle Usuario */
services.factory('DetalleUsuarioFactory', function() {

	var detalleUsuario;

  return {
    set: function(usuario) {
      detalleUsuario = usuario;
    },
		get: function() {
			return detalleUsuario;
		}
  };
});

/** Fabrica de detalle Beneficiario */
services.factory('DetalleBeneficiarioFactory', function() {

	var detalleBeneficiario;

  return {
    set: function(beneficario) {
      detalleBeneficiario = beneficario;
    },
		get: function() {
			return detalleBeneficiario;
		}
  };
});

/** Fabrica de detalle Convocatoria */
services.factory('DetalleConvocatoriaFactory', function() {

	var detalleConvocatoria;

  return {
    set: function(convocatoria) {
      detalleConvocatoria = convocatoria;
    },
		get: function() {
			return detalleConvocatoria;
		}
  };
});

/** Fabrica de detalle Tipo de Identificacion */
services.factory('DetalleTipoIndetificacionFactory', function() {

	var detalleTipoIdentificacion;

  return {
    set: function(tipoIdentificacion) {
      detalleTipoIdentificacion = tipoIdentificacion;
    },
		get: function() {
			return detalleTipoIdentificacion;
		}
  };
});

/** Fabrica de detalle Estado */
services.factory('DetalleEstadoFactory', function() {

	var detalleEstado;

  return {
    set: function(estado) {
      detalleEstado = estado;
    },
		get: function() {
			return detalleEstado;
		}
  };
});

/** Fabrica de Beneficiarios */
services.factory("BeneficiariosFactory", ["$firebaseArray", "FB",
	function($firebaseArray, FB) {
		var ref = new Firebase(FB.BENEFICIARIOS);
		return $firebaseArray(ref);
	}
]);

/** Fabrica de departamentos */
services.factory('DepartamentosFactory', function() {

  var DepartamentosList = [
		{id: 1 , nombre: "Cundinamarca"},
		{id: 2 , nombre: "Antioquia"},
		{id: 3 , nombre: "Valle del Cauca"}
	];

  return {
    all: function() {
      return DepartamentosList;
    },
		getIndex: function (id) {
			var deptoTemp;

			angular.forEach(DepartamentosList, function (departamento) {
					if (angular.equals(departamento.id, parseInt(id))) {
							deptoTemp = departamento;
					}
			});

			return deptoTemp;
		}
  };
});

/** Fabrica de Ciudaddes */
services.factory('CiudadesFactory', function() {

  var CiudadesList = [
		{id: 1 , nombre: "Bogotá", departamentoId: 1},
		{id: 2 , nombre: "Medellín", departamentoId: 2},
		{id: 3 , nombre: "Cali", departamentoId: 3}
	];

  return {
    all: function() {
      return CiudadesList;
    },
		getIndex: function (id) {
			var ciudadTemp;

			angular.forEach(CiudadesList, function (ciudad) {
					if (angular.equals(ciudad.id, parseInt(id))) {
							ciudadTemp = ciudad;
					}
			});

			return ciudadTemp;
		}
  };
});

/** Fabrica de Semestres */
services.factory('SemestresFactory', function() {

  var SemestresList = [
		{id: 1 , nombre: "1"},
		{id: 2 , nombre: "2"},
		{id: 3 , nombre: "3"},
		{id: 4 , nombre: "4"},
		{id: 5 , nombre: "5"},
		{id: 6 , nombre: "6"},
		{id: 7 , nombre: "7"},
		{id: 8 , nombre: "8"},
		{id: 9 , nombre: "9"},
		{id: 10 , nombre: "10"}
	];

  return {
    all: function() {
      return SemestresList;
    }
  };
});

/** Fabrica de Nivel Formacion */
services.factory('NivelFormacionFactory', function() {

  var NivelFormacionList = [
		{id: 1 , nombre: "Técnico"},
		{id: 2 , nombre: "Tecnólogo"},
		{id: 3 , nombre: "Universitario"},
		{id: 4 , nombre: "Maestria"}
	];

  return {
    all: function() {
      return NivelFormacionList;
    },
		getIndex: function (id) {
			var nivelFormacionTemp;

			angular.forEach(NivelFormacionList, function (nivelFormacion) {
					if (angular.equals(nivelFormacion.id, parseInt(id))) {
							nivelFormacionTemp = nivelFormacion;
					}
			});

			return nivelFormacionTemp;
		}
  };
});

/** Fabrica de Avance */
services.factory('AvanceFactory', function() {

  var AvanceList = [
		{id: 10 , nombre: "10%"},
		{id: 20 , nombre: "20%"},
		{id: 30 , nombre: "30%"},
		{id: 40 , nombre: "40%"},
		{id: 50 , nombre: "50%"},
		{id: 60 , nombre: "70%"},
		{id: 70 , nombre: "70%"},
		{id: 80 , nombre: "80%"},
		{id: 90 , nombre: "90%"},
		{id: 100 , nombre: "100%"}
	];

  return {
    all: function() {
      return AvanceList;
    }
  };
});

/** Fabrica para la autenticacion con firebase */
services.factory("AuthFactory", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

/** Fabrica referencias FireBase */
services.factory("RefFBFactory", function(){
	var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/");
	return ref;
});

/** Fabrica de usuarios */
services.factory("UsuariosFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/usuarios");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de estados */
services.factory("EstadosFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/estados");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de convocatorias */
services.factory("ConvocatoriasFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/convocatorias");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de Roles */
services.factory("RolesFactory", function () {
	var RolesList = [
		{id: 1 , nombre: "Administrador"},
		{id: 2 , nombre: "Beneficiario"},
		{id: 3 , nombre: "Funcionario"}
	];

  return {
    all: function() {
      return RolesList;
    }
  };
});

/** Fabrica de Tipos de Indentificación */
services.factory("TiposIdentificacionFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/configuracion/tiposIdentificacion");
		return $firebaseArray(ref);
	}
]);

/** Fabrica de Roles Usuario*/
services.factory("RolesUsuarioFactory", ["$firebaseArray",

	function($firebaseArray) {
		var ref = new Firebase("https://seguimientotalentodigital.firebaseio.com/rolesUsuario");
		return $firebaseArray(ref);
	}
]);
