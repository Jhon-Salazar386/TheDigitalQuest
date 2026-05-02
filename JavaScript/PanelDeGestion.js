const URL = "http://localhost:8055/items/deportista";
const TOKEN = "vnVQwn2R8ZL5zWsAFTu8MLhqYLMj-BJz";

document.addEventListener("DOMContentLoaded", () => {

    let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const inicioSesion = document.getElementById("iniciarSesion");
    const Perfil = document.getElementById("Perfil")
    
    if(usuarioLogueado){
        inicioSesion.style.display = "none";
        Perfil.style.display = "block";
    } else {
        inicioSesion.style.display = "block";
        Perfil.style.display = "none";
    }

    const deportistasTable = document.getElementById("trDeportistas");

    // Carga los datos de todos los deportistas y los inserta en forma de fila de una tabla
    async function cargarDeportistas() {
        try {
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }
            });

            if (!res.ok){
                const mensajeError = await res.json();
                throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
            } 

            const datos = await res.json();

            let html = "";

            datos.data.forEach(d => {
                html += `
                    <tr>
                        <td>${d.DNI}</td>
                        <td>${d.Nombre}</td>
                        <td>${d.Apellidos}</td>
                        <td>${d.Genero}</td>
                        <td>${d.FechaNac}</td>
                        <td>${d.Ciudadnac}</td>
                        <td>${d.Email}</td>
                        <td>${d.Telefono}</td>
                    </tr>
                `;
            });

            deportistasTable.innerHTML = html;

        } catch (error) {
            console.error(error);
            alert("Error al cargar deportistas");
        }
    }

    cargarDeportistas();

    // Crea el nuevo objeto deportista y lo agrega al localstorage
    // El objeto creado se usa para un metodo que lo inserta en la base de datos
    document.getElementById("insertar").addEventListener("click", async (e) => {
        e.preventDefault();

        const deportista = {
            dni: document.getElementById("dni").value.trim(),
            nombre: document.getElementById("nombre").value.trim(),
            apellidos: document.getElementById("apellidos").value.trim(),
            contrasena: document.getElementById("contrasena").value.trim(),
            genero: document.getElementById("genero").value.trim(),
            fecha: document.getElementById("fechaNac").value.trim(),
            ciudad: document.getElementById("ciudadNac").value.trim(),
            email: document.getElementById("email").value.trim(),
            telefono: document.getElementById("telefono").value.trim()
        };

        if (!deportista.dni || deportista.dni.trim() === ""){
            return alert("Debes rellenar el DNI");
        }

        if (!/^\d{8}[A-Za-z]$/.test(deportista.dni)){
            return alert("DNI inválido");
        }

        /* VALIDACIONES DE CAMPOS VACÍOS */
        if (!deportista.nombre) {
            return alert("Debes rellenar el nombre");
        }

        if (!deportista.apellidos) {
            return alert("Debes rellenar los apellidos");
        }

        if (!deportista.contrasena) {
            return alert("Debes ingresar una contraseña");
        }

        if (!deportista.genero) {
            return alert("Debes seleccionar el género");
        }

        if (!deportista.fecha) {
            return alert("Debes rellenar la fecha de nacimiento");
        }

        if (!deportista.ciudad) {
            deportista.ciudad = null;
        }

        if (!deportista.telefono) {
            return alert("Debes rellenar el teléfono");
        }

        /* EMAIL */
        if (!deportista.email) {
            return alert("Debes ingresar email")
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deportista.email)){
            return alert("Email inválido");
        }

        try {
            await agregarDeportista(deportista);
            cargarDeportistas();
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById("actualizar").addEventListener("click", async function(e){
        e.preventDefault();

        let dni = document.getElementById("dniActualizar").value.trim();
        let opcion = document.getElementById("campoActualizar").value.trim();
        let nuevoValor = document.getElementById("nuevoValor").value.trim();
        let campoActualizar;

        if (!dni || dni.trim() === ""){
            return alert("Debes rellenar el DNI"); 
        } 
        if (!/^\d{8}[A-Za-z]$/.test(dni)){
            return alert("DNI inválido");
        } 

        if(nuevoValor === ""){
            return alert("El campo esta vacio")
        }

        switch(opcion){

            case "Nombre":
                campoActualizar = {
                    "Nombre": nuevoValor
                }
            break;
            case "Apellido":
                campoActualizar = {
                    "Apellidos": nuevoValor
                }
            break;
            case "Email":

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoValor)){
                    return alert("Email inválido");
                }

                campoActualizar = {
                    "Email": nuevoValor
                }
            break;
            case "Telefono":

                // Validación: solo números, longitud entre 9 y 15
                if (!/^\d{9,15}$/.test(nuevoValor)) {
                    return alert("Teléfono inválido (solo números, entre 9 y 15 dígitos)");
                }

                campoActualizar = {
                    "Telefono": nuevoValor
                }
            break;

            case "CiudadNac":
                campoActualizar = {
                    "Ciudadnac": nuevoValor
                }
            break;

            default:
                alert("Debes elejir una opcion")
        }

        console.log(campoActualizar);

        if(await actualizarDeportista(dni, campoActualizar)){
            alert("Campo actualizado");
        } else {
            alert("Algo ha salido mal");
        }

    })

});

// Inserta a un nuevo deportista en la base de datos
async function agregarDeportista(deportista) {

    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                DNI: deportista.dni,
                Nombre: deportista.nombre,
                Apellidos: deportista.apellidos,
                Contrasena: deportista.contrasena,
                Genero: deportista.genero,
                FechaNac: deportista.fecha,
                Ciudadnac: deportista.ciudad,
                Email: deportista.email,
                Telefono: deportista.telefono
            })
        });

        if (!res.ok){
            const mensajeError = await res.json();
            throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
        } 

        alert("Registro creado correctamente");
        return true;

    } catch (error) {
        console.error(error);
        alert(error.message);
        return false;
    }
}


// Actualiza el email de un deportista
// Planeo agregar una nueva funcion auxiliar para que el usuario pueda elejir que quiere cambiar(Dentro de lo que se puede)
async function actualizarDeportista(dni, camposActualizar) {     

    try {
        const res = await fetch(URL+ "/" + dni, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + TOKEN
            },
            body: JSON.stringify(camposActualizar)
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

// Metodo encargado de eliminar a un deportista de la base de datos
async function eliminarDeportista(e) {
    e.preventDefault();

    const dni = document.getElementById("dniDelete").value.trim();

    if (!dni){
        return alert("Debes rellenar el campo");
    } 

    try {
        const res = await fetch(URL + "/" + dni, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + TOKEN
            }
        });

        if (!res.ok){
            const mensajeError = await res.json();
            throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
        } 

        alert("Registro eliminado correctamente");

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};