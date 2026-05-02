document.addEventListener("DOMContentLoaded", function(){
    let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const inicioSesion = document.getElementById("iniciarSesion");
    const Perfil = document.getElementById("Perfil")
    const mGestion = document.getElementById("menuGestion");
    const inscribirse = document.querySelectorAll(".inscribirse");

    if(usuarioLogueado){
        inicioSesion.style.display = "none";
        Perfil.style.display = "block";
    } else {
        inicioSesion.style.display = "block";
        Perfil.style.display = "none";
    }

    if (usuarioLogueado && usuarioLogueado.organizador) {
        mGestion.style.display = "block";
    } else {
        mGestion.style.display = "none";
    }

    inscribirse.forEach(boton => {
        boton.addEventListener("click", function (e) {
            if (!usuarioLogueado) {
                e.preventDefault();
                alert("No estás logueado en la página");
                window.location.href = "./HTML/InicioSesion.html";
            }
        });
    });

    document.getElementById("InicioRapido").addEventListener("click", function(){

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const fastLog = {
            dni: "40000001A",
            contrasena: "1234",
            organizador: true
        };

        sessionStorage.setItem("usuarioLogueado", JSON.stringify(fastLog));

        location.reload();

        alert("Usuario de prueba creado y logueado!");
    });

});