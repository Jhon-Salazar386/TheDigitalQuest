# Descripcion

Se integro la api de manera parcial en la pagina web en la que usamos por el momento 2 tablas(deportista y ciudad).

## Jhon Salazar(API Deportista)

Implemente la api de deportista en la seccion de administracion de la pagina web, la cual es accesible solo si cuentas con el permiso de organizacion.

Por lo general, no hubo ningun contratiempo a la hora de agregar las funciones GET, POST, PATH, DELETE en la seccion de panel de organizador.

Sin embargo, tuve un contratiempo cuando quise implementarlo en el formulario de registro del usuario, en el cual, saltaba que "Campo" no puede contener valores nulos.

### Metodo GET

El metodo trae toda la informacion de la tabla deportista y la muestra en la pagina web en forma de tabla.

  <img width="1353" height="612" alt="image" src="https://github.com/user-attachments/assets/ca7cd817-2927-4c87-909e-36ea0a884cad" />

### Metodo POST

El envío de la solicitud POST se realiza a través de un formulario en el que se introducen los datos del deportista. Al hacer clic en el botón de envío, se registra automáticamente un nuevo deportista en el sistema.

<img width="384" height="604" alt="image" src="https://github.com/user-attachments/assets/51a2ff13-f942-49d0-a76a-f100266bf571" />

<img width="800" height="612" alt="image" src="https://github.com/user-attachments/assets/a743a87b-c6b5-42de-878c-b17371d27d8e" />

<img width="1217" height="67" alt="image" src="https://github.com/user-attachments/assets/e2fea529-3f32-4e82-850d-3559eb30eafe" />

### Metodo PATH

Actualiza informacion acerca de un deportista, mediante un formulario se inserta el dni y el email al que quieres cambiar.

<img width="375" height="300" alt="image" src="https://github.com/user-attachments/assets/baf754d3-62dc-4956-a55e-6684a345adae" />

<img width="459" height="426" alt="image" src="https://github.com/user-attachments/assets/04984da5-83c1-4986-9d25-1a72dbbde19b" />

<img width="1215" height="68" alt="image" src="https://github.com/user-attachments/assets/41ee4aa3-c748-49c4-a0f7-270680549526" />

### Metodo DELETE

Elimina a un deportista de la base de datos, se inserta su clave primaria(dni) y automaticamente se elimina el registro.

<img width="367" height="218" alt="image" src="https://github.com/user-attachments/assets/c59622e9-01a6-4eb9-a73b-86c0bb7537b2" />

<img width="446" height="145" alt="image" src="https://github.com/user-attachments/assets/8b4694ec-28dc-4c9f-bfdc-0d2846f98d11" />


## Alexandru Banari(API Ciudad)
