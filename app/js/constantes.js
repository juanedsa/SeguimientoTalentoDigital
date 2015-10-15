var constantes = angular.module("app.constantes", []);

constantes.constant('LOCAL_STOGARE', {
	CORREO_USUARIO: "correo_usuario",
	NOMBRE_USUARIO: "nombre_usuario"
});

constantes.constant('ADMIN', {
	UID: "529d8d30-9ff1-4787-b5e2-e03ac96eb794"
});

constantes.constant('FB', {
	APP: 									"https://seguimientotalentodigital.firebaseio.com/",
	BENEFICIARIOS: 				"https://seguimientotalentodigital.firebaseio.com/beneficiarios",
	USUARIOS: 						"https://seguimientotalentodigital.firebaseio.com/usuarios",
	ESTADOS: 							"https://seguimientotalentodigital.firebaseio.com/configuracion/estados",
	CONVOCATORIAS: 				"https://seguimientotalentodigital.firebaseio.com/configuracion/convocatorias",
	TIPOS_IDENTIFICACION: "https://seguimientotalentodigital.firebaseio.com/configuracion/tiposIdentificacion"
});

constantes.constant('ERROR', {
	INICIAR_SESION: "Correo y/o Clave invalidos por favor verifique e intente de nuevo."
});

constantes.constant('ROL', {
	ADMINISTRADOR: 	1,
	BENEFICIARIO: 	2,
	FUNCIONARIO: 		3
});
