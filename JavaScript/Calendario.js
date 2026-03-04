document.addEventListener("DOMContentLoaded", function(){

    const inscribirse = document.getElementById("inscribirse");
    const resultado = document.getElementById("resultado");
    let usuarioLog = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

    if (usuarioLog && usuarioLog.organizador) {
        inscribirse.innerText = "Menu de eventos";
        inscribirse.id = "insertarEvento";
        inscribirse.setAttribute("href", "MenuDeOrganizador.php");
    }

    inscribirse.addEventListener("click", function(e){
        if (!usuarioLog) {
            e.preventDefault();
            alert("No estas logueado en la pagina");
            window.location.href = "InicioSesion.html";
            return;
        }
    });

});