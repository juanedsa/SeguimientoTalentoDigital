var services = angular.module('app.services', []);

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
    }
  };
});

/** Fabrica de Ciudaddes */
services.factory('CiudadesFactory', function() {

  var CiudadesList = [
		{id: 1 , nombre: "Bogota", departamentoId: 1},
		{id: 2 , nombre: "Medellin", departamentoId: 2},
		{id: 3 , nombre: "Cali", departamentoId: 3}
	];

  return {
    all: function() {
      return CiudadesList;
    }
  };
});
