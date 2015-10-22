var constantes = angular.module("app.constantes", []);

/** Constantes para el manejo del local storage */
constantes.constant('LOCAL_STOGARE', {
	CORREO_USUARIO: "correo_usuario",
	NOMBRE_USUARIO: "nombre_usuario",
	BENEFICIARIO: 	"beneficiario"
});

/** Contantes para el admin */
constantes.constant('ADMIN', {
	UID: "529d8d30-9ff1-4787-b5e2-e03ac96eb794"
});

/** Cosntantes para las referencias de firebase */
constantes.constant('FB', {
	APP: 									"https://seguimientotalentodigital.firebaseio.com/",
	BENEFICIARIOS: 				"https://seguimientotalentodigital.firebaseio.com/beneficiarios",
	USUARIOS: 						"https://seguimientotalentodigital.firebaseio.com/usuarios",
	ESTADOS: 							"https://seguimientotalentodigital.firebaseio.com/configuracion/estados",
	CONVOCATORIAS: 				"https://seguimientotalentodigital.firebaseio.com/configuracion/convocatorias",
	TIPOS_IDENTIFICACION: "https://seguimientotalentodigital.firebaseio.com/configuracion/tiposIdentificacion"
});

/** Constantes de error */
constantes.constant('ERROR', {
	INICIAR_SESION: "Correo y/o Clave invalidos por favor verifique e intente de nuevo."
});

/** Constantes de rol */
constantes.constant('ROL', {
	ADMINISTRADOR: 	1,
	BENEFICIARIO: 	2,
	FUNCIONARIO: 		3
});

/** Constantes nivel de formacion */
constantes.constant('NIVEL_FORMACION', {
	TECNICO: 				1,
	TECNOLOGO: 			2,
	UNIVERSITARIO: 	3,
	MAESTRIA: 			4
});

/** Conatantes de ciudad */
constantes.constant('CIUDAD', {
	BOGOTA: 				1,
	MEDELLIN: 			2,
	CALI: 					3
});

/** Contants de convocatorias */
constantes.constant('CONVOCATORIA', {
	UNO: 			1,
	DOS: 			2,
	TRES: 		3,
	CUATRO: 	4
});
