document.addEventListener("DOMContentLoaded", function() {

    const usuario = document.getElementById("usuario");
    const contraseña = document.getElementById("contra");
    const iniciar = document.getElementById("iniciarSesion");
    const terminos = document.getElementById("terminos");

    iniciar.addEventListener("click", function(e) {
        
        e.preventDefault();

        let valorUsuario = usuario.value.trim();
        let valorContraseña = contraseña.value.trim();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioEncontrado = null;

        usuario.classList.remove("is-invalid");
        contraseña.classList.remove("is-invalid");

        let valido = true;

        if (!usuario.checkValidity()) {
        usuario.classList.add("is-invalid");
        }

        if (!contra.checkValidity()) {
        contra.classList.add("is-invalid");
        }

        if (!terminos.checkValidity()) {
        terminos.classList.add("is-invalid");
        return;
        }

        usuarios.forEach(u => {
            if ((u.nombre === valorUsuario || u.email === valorUsuario) && u.contraseña === valorContraseña) {
                usuarioEncontrado = u;
            }
        });

        if(usuarioEncontrado && usuarioEncontrado.organizador) {
            alert("Logueado correctamente como organizador. Bienvenido " + valorUsuario)
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
            window.location.href = "../Index.html";
            return;
        }

        if (usuarioEncontrado) {
            alert("Logueado correctamente");
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
            window.location.href = "../Index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
    terminos.addEventListener("click", () => {
        terminos.classList.remove("is-invalid");
        terminos.classList.add("is-valid");
    })
});
