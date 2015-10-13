var filtros = angular.module('app.filters', []);

/** Filtro para ciudades segun su departamento */
filtros.filter('ciudadesFitro', function () {
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
