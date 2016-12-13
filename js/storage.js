if (typeof(Storage) !== "undefined") {
	// Almacenamiento local
	localStorage.setItem("name", "Batman");
	console.log(localStorage.getItem("name"));
	localStorage.removeItem("name");

	// Almacenamiento a nivel de sesión
	sessionStorage.setItem("name", "Batman");
	console.log(sessionStorage.getItem("name"));
	sessionStorage.removeItem("name");
} else {
	console.log("NO");
}