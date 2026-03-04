document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formInscripcion");
    const contraseñaInput = document.getElementById("ConfirmIncripcion");

    let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"))
    
    let inscripciones = JSON.parse(localStorage.getItem("Inscripciones")) || []

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const password = contraseñaInput.value.trim();

        if (password === "") {
            alert("Debes ingresar tu contraseña");
            return;
        }

        if(password != usuarioLogueado.contraseña){
            alert("Algo ha ido mal")
            return;
        }

        const nuevaInscripcion = {
            nombre: usuarioLogueado.nombre,
            evento: document.getElementById("evento").value
        };

        inscripciones.push(nuevaInscripcion);

        localStorage.setItem("Inscripciones", JSON.stringify(inscripciones))

        alert("Inscripción emitida correctamente");
        window.location.href = "Calendario.html"
    });

});
