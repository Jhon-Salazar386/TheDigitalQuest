const URL = "http://localhost:8055/items/deportista";
const TOKEN = "vnVQwn2R8ZL5zWsAFTu8MLhqYLMj-BJz";

document.addEventListener("DOMContentLoaded", function () {

    const dniField = document.getElementById("dni");
    const nombreField = document.getElementById("nombre");
    const apellidoField = document.getElementById("apellido");
    const generoField = document.getElementById("genero");
    const fechaField = document.getElementById("fecha");
    const ciudadField = document.getElementById("ciudad");
    const emailField = document.getElementById("email");
    const telefonoField = document.getElementById("telefono");

    const contra = document.getElementById("contra");
    const confirmcontra = document.getElementById("confirmcontra");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    document.getElementById("registrarse").addEventListener("click", async function (e) {
        e.preventDefault();

        const campos = [
            dniField,
            nombreField,
            apellidoField,
            contra,
            confirmcontra,
            fechaField,
            generoField,
            telefonoField,
            emailField
        ];

        campos.forEach(campo => {
            if (campo) campo.classList.remove("is-invalid");
        });

        let valido = true;

        let dniValue = dniField.value.trim();
        let nombreValue = nombreField.value.trim();
        let apellidoValue = apellidoField.value.trim();
        let password = contra.value.trim();
        let confirmPassword = confirmcontra.value.trim();
        let emailValue = emailField.value.trim();

        const emailSymbol = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dniRegex = /^\d{8}[A-Za-z]$/;

        if (!dniRegex.test(dniValue)) {
            dniField.classList.add("is-invalid");
            valido = false;
        }

        if (nombreValue === "") {
            nombreField.classList.add("is-invalid");
            valido = false;
        }

        if (apellidoValue === "") {
            apellidoField.classList.add("is-invalid");
            valido = false;
        }

        if (password === "") {
            contra.classList.add("is-invalid");
            valido = false;
        }

        if (confirmPassword === "") {
            confirmcontra.classList.add("is-invalid");
            valido = false;
        }

        if (password !== confirmPassword) {
            confirmcontra.classList.add("is-invalid");
            alert("Las contraseñas no coinciden.");
            valido = false;
        }

        if (fechaField.value === "") {
            fechaField.classList.add("is-invalid");
            valido = false;
        }

        if (generoField.value === "") {
            generoField.classList.add("is-invalid");
            valido = false;
        }

        if (telefonoField.value.trim() === "") {
            telefonoField.classList.add("is-invalid");
            valido = false;
        }

        if (!emailSymbol.test(emailValue)) {
            emailField.classList.add("is-invalid");
            valido = false;
        }

        if (!valido) return;

        let deportista = {
            dni: dniValue,
            nombre: nombreValue,
            apellidos: apellidoValue,
            contrasena: password,
            fecha: fechaField.value,
            genero: generoField.value,
            ciudad: ciudadField.value || "No especificada",
            telefono: telefonoField.value.trim(),
            email: emailValue,
            organizador: false
        };

        if(await insertarDeportista(deportista)){
            usuarios.push(deportista);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Registrado correctamente");
            window.location.href = "../index.html";
        } else {
            alert("Algo ha salido mal");
        }

    });
});


// Crea un nuevo registro en la base de datos
async function insertarDeportista(deportista) {

    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                "DNI": deportista.dni,
                "Nombre": deportista.nombre,
                "Apellidos": deportista.apellidos,
                "Contrasena": deportista.contrasena,
                "Genero": deportista.genero,
                "FechaNac": deportista.fecha,
                "Ciudadnac": deportista.ciudad,
                "Email": deportista.email,
                "Telefono": deportista.telefono
            })
        });

        if (!res.ok) {
            const mensajeError = await res.json();
            throw new Error(
                "Error API: " + res.status + " - " + (mensajeError?.errors?.[0]?.message || "Error desconocido")
            );
        }

        return true;

    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}