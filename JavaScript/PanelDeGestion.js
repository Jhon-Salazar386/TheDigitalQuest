const URL = "http://localhost:8055/items/deportista";
const TOKEN = "eFrBb1haBX1rAmdCp_iskR9qCjaWq-Op";

document.addEventListener("DOMContentLoaded", () => {

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
            genero: document.getElementById("genero").value.trim(),
            fecha: document.getElementById("fechaNac").value.trim(),
            ciudad: document.getElementById("ciudadNac").value.trim(),
            email: document.getElementById("email").value.trim(),
            telefono: document.getElementById("telefono").value.trim()
        };

        try {
            await agregarDeportista(deportista);
            cargarDeportistas();
        } catch (error) {
            console.error(error);
        }
    });

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
async function actualizarDeportista(e) {
    e.preventDefault();

    const dni = document.getElementById("dniActualizar").value.trim();
    const nuevoEmail = document.getElementById("nuevoEmail").value.trim();

    if (!dni){
       return alert("Debes rellenar el DNI"); 
    } 
    if (!/^\d{8}[A-Za-z]$/.test(dni)){
        return alert("DNI inválido");
    } 

    if (!nuevoEmail) {
        return alert("Debes ingresar email")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoEmail)){
        return alert("Email inválido");
    }
        

    try {
        const res = await fetch(URL+ "/" + dni, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + TOKEN
            },
            body: JSON.stringify({
                Email: nuevoEmail
            })
        });

        if (!res.ok){
            const mensajeError = await res.json();
            throw new Error("Error al llamar a la API: " + res.status + ":" + mensajeError.errors[0].message);
        } 

        alert("Registro actualizado correctamente");

    } catch (error) {
        console.error(error);
        alert(error.message);
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