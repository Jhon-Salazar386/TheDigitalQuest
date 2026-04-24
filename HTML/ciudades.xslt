<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
<html lang="es">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"/>

    <style>

        section{
            display: block;
            justify-content: center;
            width: 90%;
            border-collapse: collapse;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            margin:10px 20px;
        }   

        h2{
            color: #004C8C;
        }

        table{
            border:1px solid;
            width: 60%;
        }

        th {
            background-color:#004C8C;
            color: #ffffff;
            text-align: left;
            padding: 14px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
        }

        td {
            padding: 12px 14px;
            border-bottom: 1px solid #e6e6e6;
            font-size: 0.95rem;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:nth-child(even) {
            background-color: #f9fbfd;
        }

        tr:hover {
            background-color: #eef4fb;
        }

        td:nth-child(1) {
            font-weight: 600;
            color: #2c3e50;
        }

    </style>

</head>
<body>
    <section>
        <h2>Ciudades</h2>

        <table>
            <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Ubicacion</th>
            </tr>

            <xsl:for-each select="ciudades/ciudad">
                <tr>
                    <td><xsl:value-of select="@Codigo"/></td>
                    <td><xsl:value-of select="Nombre"/></td>
                    <td><xsl:value-of select="Ubicacion"/></td>
                </tr>
            </xsl:for-each>

        </table>
    </section>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
