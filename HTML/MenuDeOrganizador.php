<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MenuDeORganizador</title>
    <link rel="stylesheet" href="../CSS/MenuDeEventos.css?v=123">
    <script src="../JavaScript/MenuDeOrganizador.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <header>
        <div>
            <div class="d-flex align-items-center gap-3">
                <img id="logo" src="../IMG/LogoRTS.png" alt="Logo de RockTheSport">
                <h1 class="m-0 fw-bold display-6 text-white">Menu principal</h1>
            </div>
        </div>
        <nav class="navbar navbar-expand-md navbar-dark p-0" id="navegacion">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#Menu">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="Menu">
                    <div class="navbar-nav">
                        <a href="Recorridos.html" class="nav-link bi bi-dpad-fill"><i>Recorridos</i></a>
                        <a href="Calendario.html" class="nav-link bi bi-calendar-date-fill">Ver calendario</a>
                        <a href="InicioSesion.html" id="iniciarSesion" class="nav-link bi bi-box-arrow-in-right">Iniciar sesión</a>
                        <a href="../Index.html" class="nav-link bi bi-arrow-return-left">Inicio</a>
                        <a href="Perfil.html" id="Perfil" class="nav-link bi bi-person-fill">Ver perfil</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main class="flex-fill">
        <section>
            <h2 style="color:#004C8C;">Exportar Deportistas a XML</h2>

            <form method="post">
                <button type="submit" name="exportarDeportistas" class="exportar">
                    Mostrar listado de deportistas
                </button>
            </form>

            <?php
                if (isset($_POST['exportarDeportistas'])) {

                    // Conexión a MySQL (Docker)
                    $conexion = new mysqli("host.docker.internal", "root", "1DAW3_BBDD", "rockthesport");

                    if ($conexion->connect_error) {
                        die("Error de conexión");
                    }

                    $resultado = $conexion->query("SELECT * FROM deportista");

                    // Crear XML
                    $xml = new SimpleXMLElement('<deportistas/>');

                    while ($fila = $resultado->fetch_assoc()) {

                        $empleado = $xml->addChild('deportista');
                        $empleado->addAttribute('dni', $fila['DNI']);
                        $empleado->addChild('nombre', $fila['Nombre']);
                        $empleado->addChild('apellido', $fila['Apellidos']);
                        $empleado->addChild('genero', $fila['Genero']);
                        $empleado->addChild('edad', (int)$fila['Edad']);
                        $empleado->addChild('ciudadnac', $fila['Ciudadnac']);
                    }

                    // Validar con XSD
                    $dom = new DOMDocument();
                    $dom->loadXML($xml->asXML());

                    $xslDoc = new DOMDocument();
                    $xslDoc->load("Deportistas.xslt");

                    $proc = new XSLTProcessor();
                    $proc->importStylesheet($xslDoc);

                    echo $proc->transformToXML($dom);
                }
            ?>            
        </section>
        <section>
            <h2 style="color:#004C8C;">Exportar Ciudades disponibles a XML</h2>

            <form method="post">
                <button type="submit" name="exportarCiudades" class="exportar">
                    Mostrar listado de Ciudades
                </button>
            </form>

            <?php
                if (isset($_POST['exportarCiudades'])) {

                    $conexion = new mysqli("host.docker.internal", "root", "1DAW3_BBDD", "rockthesport");

                    if ($conexion->connect_error) {
                        die("Error de conexión");
                    }

                    $resultado = $conexion->query("SELECT * FROM Ciudad");

                    $xml = new SimpleXMLElement('<ciudades/>');

                    while ($fila = $resultado->fetch_assoc()) {

                        $empleado = $xml->addChild('ciudad');
                        $empleado->addAttribute('Codigo', $fila['Codigo']);
                        $empleado->addChild('Nombre', $fila['Nombre']);
                        $empleado->addChild('Ubicacion', $fila['Ubicacion']);
                    }

                    // Validar con XSD
                    $dom = new DOMDocument();
                    $dom->loadXML($xml->asXML());

                    $xslDoc = new DOMDocument();
                    $xslDoc->load("ciudades.xslt");

                    $proc = new XSLTProcessor();
                    $proc->importStylesheet($xslDoc);

                    echo $proc->transformToXML($dom);
                }
            ?>            
        </section>
    </main>

    <footer class="mt-auto">
        <div>
            <p><strong>© 2024 RockTheSport - Plataforma para gestionar eventos deportivos</strong></p>
        </div>
        <nav class="footer-nav">
            <ul>
                <li class="footer-title">Redes sociales:</li>
                <li><a href="https://www.instagram.com/rockthesport/?hl=es">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
            </ul>
            <ul>
                <li class="footer-title">¿Necesitas ayuda?:</li>
                <li><a href="#">Contáctanos</a></li>
                <li><a href="GuiaOrganizador.html">Guía para organizadores</a></li>
            </ul>
        </nav>
        <img src="../IMG/LogoRTS.png" alt="Logo RocktheSport">
    </footer>

</body>
</html>