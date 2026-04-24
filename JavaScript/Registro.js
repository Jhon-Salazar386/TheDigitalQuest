document.addEventListener("DOMContentLoaded", function() {
    
    const dniField = document.getElementById("dni");
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

    registrar.addEventListener("click", async function(e) {
        e.preventDefault(); 

        const campos = [dniField, usuario, apellido, contra, confirmcontra, fecha, genero, telefono, email];
        campos.forEach(campo => campo.classList.remove("is-invalid"));

        let valido = true;
        let apellidoValue = apellido.value.trim();
        let password = contra.value.trim();
        let confirmPassword = confirmcontra.value.trim();
        let emailValue = email.value.trim();
        let dniValue = dniField.value.trim();

        const emailSymbol = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dniRegex = /^\d{8}[A-Za-z]$/;

        if (!dniRegex.test(dniValue)) {
            dniField.classList.add("is-invalid");
            valido = false;
        }

        if (!usuario.checkValidity()) {
            usuario.classList.add("is-invalid");
            valido = false;
        }

        if (apellidoValue === "") {
            apellido.classList.add("is-invalid");
            valido = false;
        }

        if (!contra.checkValidity()) {
            contra.classList.add("is-invalid");
            valido = false;
        }

        if (!confirmcontra.checkValidity()) {
            confirmcontra.classList.add("is-invalid");
            valido = false;
        }

        if (password !== confirmPassword) {
            confirmcontra.classList.add("is-invalid");
            alert("Las contraseñas no coinciden.");
            valido = false;
        }

        if (!fecha.checkValidity()) {
            fecha.classList.add("is-invalid");
            valido = false;
        }

        if (!genero.checkValidity()) {
            genero.classList.add("is-invalid");
            valido = false;
        }

        if (!telefono.checkValidity()) {
            telefono.classList.add("is-invalid");
            valido = false;
        }

        if (!email.checkValidity() || !emailSymbol.test(emailValue)) {
            email.classList.add("is-invalid");
            valido = false;
        }

        if (!valido) return;

        let deportista = {
            dni: dniValue,
            nombre: usuario.value.trim(),
            apellidos: apellidoValue,
            contraseña: password,
            fecha: fecha.value,
            genero: genero.value,
            ciudad: ciudad.value || "No especificada",
            telefono: telefono.value.trim(),
            email: emailValue,
            organizador: false
        };

        usuarios.push(deportista);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registrado correctamente");
        window.location.href = "../index.html"

    });

    /*
    // 2da altertativa de insercion. Aqui se crea directamente el objeto con los valores de los inputs
    // Su uso radica en solucionar el problema al realizar la request a la api
    const registrar = document.getElementById("registrarse");

    registrar.addEventListener("click", async function(e) {

        e.preventDefault();

        const deportista = {
            dni: document.getElementById("dni").value.trim(),
            nombre: document.getElementById("usuario").value.trim(),
            apellidos: document.getElementById("apellido").value.trim(),
            genero: document.getElementById("gender").value.trim(),
            fecha: document.getElementById("fecha").value.trim(),
            ciudad: document.getElementById("ciudad").value.trim(),
            email: document.getElementById("Email").value.trim(),
            telefono: document.getElementById("phone").value.trim()
        };

        try {
            await insertarDeportista(deportista);
        } catch (error) {
            console.error(error);
        }

        console.log(deportista);

    });
    */
});


// Metodo que inserta al nuevo deportista en la base de datos(tiene un error 400 en el campo "Apellidos": Contains null values)
async function insertarDeportista(deportista){

    const URL = "http://localhost:8055/items/deportista";
    const TOKEN = "eFrBb1haBX1rAmdCp_iskR9qCjaWq-Op";

    alert(deportista.dni);

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
                "Genero": deportista.genero,
                "FechaNac": deportista.fecha,
                "Ciudadnac": deportista.ciudad,
                "Email": deportista.email,
                "Telefono": deportista.telefono
            })
        });
        if (!res.ok) {
            const mensajeError = await res.json();
            throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
        } else {
            alert("Registro completo");
            return true;
        }

    } catch (error) {
        alert(error.message);
        console.log(error.message);
        return false;
    }
}