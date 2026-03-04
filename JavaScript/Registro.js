document.addEventListener("DOMContentLoaded", function() {
    const usuario = document.getElementById("usuario");
    const contra = document.getElementById("contra");
    const apellido = document.getElementById("apellido");
    const confirmcontra = document.getElementById("confirmcontra");
    const fecha = document.getElementById("fecha");
    const genero = document.getElementById("gender");
    const ciudad = document.getElementById("ciudad");
    const telefono = document.getElementById("phone");
    const email = document.getElementById("Email");
    const registrar = document.getElementById("registrarse");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    registrar.addEventListener("click", function(e) {
        e.preventDefault(); 

        let user = usuario.value.trim();
        let surname = apellido.value.trim();
        let password = contra.value.trim();
        let confirmPassword = confirmcontra.value.trim();
        let date = fecha.value;
        let gender = genero.value;
        let city = ciudad.value;
        let phoneNumber = telefono.value.trim();
        let emailValue = email.value.trim();

        const emailSymbol = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        usuario.classList.remove("is-invalid");
        apellido.classList.remove("is-invalid");
        contra.classList.remove("is-invalid");
        confirmcontra.classList.remove("is-invalid");
        fecha.classList.remove("is-invalid");
        genero.classList.remove("is-invalid");
        
        telefono.classList.remove("is-invalid");
        email.classList.remove("is-invalid");

        let valido = true;

        if (!usuario.checkValidity()) {
            usuario.classList.add("is-invalid");
        }

        if (!apellido.checkValidity()) {
            apellido.classList.add("is-invalid");
        }

        if (!contra.checkValidity()) {
            contra.classList.add("is-invalid");
        }

        if (!confirmcontra.checkValidity()) {
            confirmcontra.classList.add("is-invalid");
        }

        if (!fecha.checkValidity()) {
            fecha.classList.add("is-invalid");
        }

        if (!genero.checkValidity()) {
            genero.classList.add("is-invalid");
        }

        if (!telefono.checkValidity()) {
            telefono.classList.add("is-invalid");
        }

        if (!email.checkValidity()) {
            email.classList.add("is-invalid");
            return;
        }


        if (!emailSymbol.test(emailValue)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const nuevoUsuario = {
        nombre: user,
        apellido: surname,
        contraseña: password,
        fecha: date,
        genero: gender,
        ciudad: city || "No especificada",
        telefono: phoneNumber,
        email: emailValue,
        organizador: false
        }

        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registro completo");
        window.location.href = "InicioSesion.html";
    });
});