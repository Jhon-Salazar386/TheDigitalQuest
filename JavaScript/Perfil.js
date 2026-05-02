const URL = "http://localhost:8055/items/deportista";
const TOKEN = "vnVQwn2R8ZL5zWsAFTu8MLhqYLMj-BJz";

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("cerrarSesion").addEventListener("click", function(){
        sessionStorage.removeItem("usuarioLogueado");
        window.location.href = "../Index.html"
    })

    async function cargarPerfil() {     

        const userLogued = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

        try {
            const res = await fetch(URL + "/" + userLogued.dni, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + TOKEN
                }
            });

            if (!res.ok){
                throw new Error("Error al llamar a la API: " + res.status);
            } 

            let datos = await res.json();

            document.getElementById("userName").innerText = datos.data.Nombre + " " + datos.data.Apellidos;
            document.getElementById("dni").innerText = datos.data.DNI;
            document.getElementById("fecha").innerText = datos.data.FechaNac;
            document.getElementById("ciudad").innerText = datos.data.Ciudadnac;
            document.getElementById("telefono").innerText = datos.data.Telefono;
            document.getElementById("email").innerText = datos.data.Email;


        } catch (error) {
            console.error(error);
            return null;
        }
    }

    cargarPerfil();

});

