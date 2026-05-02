const URL = "http://localhost:8055/items/deportista";
const TOKEN = "vnVQwn2R8ZL5zWsAFTu8MLhqYLMj-BJz";

document.addEventListener("DOMContentLoaded", function() {

    const dni = document.getElementById("dni");
    const contrasena = document.getElementById("contra");
    const iniciar = document.getElementById("iniciarSesion");
    const terminos = document.getElementById("terminos");

    iniciar.addEventListener("click", async function(e) {
        
        e.preventDefault();

        let valorDni = dni.value.trim();
        let valorContrasena = contrasena.value.trim();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        dni.classList.remove("is-invalid");
        contrasena.classList.remove("is-invalid");

        let valido = true;

        if (!dni.checkValidity()) {
            dni.classList.add("is-invalid");
        }

        if (!contrasena.checkValidity()) {
            contrasena.classList.add("is-invalid");
        }

        if (!terminos.checkValidity()) {
            terminos.classList.add("is-invalid");
            return;
        }

        let usuarioLogueado = await login(valorDni, valorContrasena);

        if (usuarioLogueado) {
            alert("Logueado correctamente");
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
            window.location.href = "../Index.html";
        } else {
            alert("Usuario no existe o contraseña incorrecta");
            console.log("Intento fallido");
        }
    });
    terminos.addEventListener("click", () => {
        terminos.classList.remove("is-invalid");
        terminos.classList.add("is-valid");
    })
});

async function login(dni, valorContrasena) {     
    try {
        const res = await fetch(URL + "/" + dni, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + TOKEN
            }
        });

        // Si no existe el usuario
        if (res.status === 404) {
            return null;
        }

        if (!res.ok){
            throw new Error("Error al llamar a la API: " + res.status);
        } 

        let datos = await res.json();

        if (valorContrasena === datos.data.Contrasena) {
            return {
                dni: datos.data.DNI,
                contrasena: valorContrasena,
                organizador: datos.data.Organizador
            };
        } else {
            return null;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}