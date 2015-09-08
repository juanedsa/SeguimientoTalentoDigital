var seguimientoTDApp = angular.module('SeguimientoTDApp', []);

seguimientoTDApp.controller('PhoneListCtrl', function ($scope) {


angular.element(document).ready(function () {
        console.log('Hello World');
        //$.material.init();
    });

  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
