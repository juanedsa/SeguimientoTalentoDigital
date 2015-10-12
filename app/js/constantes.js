var constantes = angular.module("app.constantes", []);

constantes.constant('LOCAL_STOGARE', {
	CORREO_USUARIO: "correo_usuario"
});

constantes.constant('FB', {
	APP: 						"https://seguimientotalentodigital.firebaseio.com/",
	BENEFICIARIOS: 	"https://seguimientotalentodigital.firebaseio.com/beneficiarios",
	USUARIOS: 	"https://seguimientotalentodigital.firebaseio.com/usuarios"
});

constantes.constant('ERROR', {
	INICIAR_SESION: "Correo y/o Clave invalidos por favor verifique e intente de nuevo."
});
