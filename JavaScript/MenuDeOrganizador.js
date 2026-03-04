document.addEventListener("DOMContentLoaded", function(){
    let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const inicioSesion = document.getElementById("iniciarSesion");
    const Perfil = document.getElementById("Perfil")
    const inscribirse = document.querySelectorAll(".inscribirse");

    if(usuarioLogueado){
        inicioSesion.style.display = "none";
        Perfil.style.display = "block";
    } else {
        inicioSesion.style.display = "block";
        Perfil.style.display = "none";
    }
});