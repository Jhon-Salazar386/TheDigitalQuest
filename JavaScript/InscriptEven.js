const TOKEN = "vnVQwn2R8ZL5zWsAFTu8MLhqYLMj-BJz";
const URL = "http://localhost:8055/items/edicion";

document.addEventListener("DOMContentLoaded", function () {

    const botonInscribirse = document.getElementById("inscribirse");
    const contraseñaInput = document.getElementById("ConfirmIncripcion");
    const ediciones = document.getElementById("evento");

    let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"))
    let inscripciones = JSON.parse(localStorage.getItem("Inscripciones")) || []

    async function cargarEdiciones() {

        try {

            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }
            })

            if(!response.ok){
                const mensajeError = await response.json();
                throw new Error("Error al llamar a la API: " + response.status + " : " + mensajeError.errors[0].menssage);
            }

            const datos = await response.json();

            datos.data.forEach(edicion => {
                
                let option = document.createElement("option");

                option.textContent = edicion.Nombre + " " + edicion.Fecha_Inicio + "/" + edicion.Fecha_Fin
                option.value = edicion.ID;

                ediciones.appendChild(option);

                console.log(edicion);

            });

        } catch(error){
            alert(error);
        }
    }

    cargarEdiciones();

    botonInscribirse.addEventListener("click", async function(e) {
        e.preventDefault();

        let dniDeportista = usuarioLogueado.dni;
        let contrasenaValue = contraseñaInput.value;
        let fechaHoy = new Date().toISOString().split("T")[0];
        let idEdicion = ediciones.value;

        if(contrasenaValue === usuarioLogueado.contrasena){

            let inscripcion = {
                fecha: fechaHoy,
                dni: dniDeportista,
                idEdition: idEdicion
            }

            if(await agregarInscripcion(inscripcion)){

                alert("Inscripcion realizada correctamente");

                inscripciones.push(inscripcion);
                localStorage.setItem("Inscripciones", JSON.stringify(inscripciones));

            } else {
                alert("Algo ha salido mal");
            }

        } else {
            alert("Algo ha salido mal");
        }



    });

});

// Inserta a un nuevo deportista en la base de datos
async function agregarInscripcion(inscripcion) {

    const URLINSCRIPCIONES = "http://localhost:8055/items/inscripcion";

    try {
        const res = await fetch(URLINSCRIPCIONES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                Fecha_Insc: inscripcion.fecha,
                DNI_Deportista: inscripcion.dni,
                ID_Edicion: inscripcion.idEdition
            })
        });

        if (!res.ok){
            const mensajeError = await res.json();
            throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
        } 

        return true;

    } catch (error) {
        console.error(error);
        alert(error.message);
        return false;
    }
}
