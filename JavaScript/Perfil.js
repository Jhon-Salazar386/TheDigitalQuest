document.addEventListener("DOMContentLoaded", function(){
    const userLogued = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    document.getElementById("userName").innerText =userLogued.nombre + " " + userLogued.apellidos;
    document.getElementById("dni").innerText = userLogued.dni;
    document.getElementById("fecha").innerText = userLogued.fecha;
    document.getElementById("ciudad").innerText = userLogued.ciudad;
    document.getElementById("telefono").innerText = userLogued.telefono;
    document.getElementById("email").innerText = userLogued.email;

    document.getElementById("cerrarSesion").addEventListener("click", function(){
        sessionStorage.removeItem("usuarioLogueado");
        window.location.href = "../Index.html"
    })
});