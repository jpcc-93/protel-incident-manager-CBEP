# Explicación del Ingreso y Registro

Se ha completado la funcionalidad de registro e inicio de sesión para la aplicación Protel.

## Funcionalidades Implementadas

1.  **Registro de Usuarios (`/register`)**:
    -   Permite crear nuevos usuarios.
    -   Las contraseñas se almacenan de forma segura (hasheadas) en la base de datos.
    -   **Usuario por defecto**: Se puede registrar el usuario `admin` con contraseña `admin` para pruebas.

2.  **Inicio de Sesión (`/login`)**:
    -   Permite a los usuarios registrados ingresar al sistema.
    -   Al iniciar sesión exitosamente, se redirige al Dashboard.
    -   Se guarda un token de sesión localmente.

3.  **Barra Superior (Topbar)**:
    -   Muestra el nombre del usuario logueado.
    -   Incluye un botón para **Cerrar Sesión** (Logout).
    -   Si no hay sesión activa, muestra un botón para ir al Login.

## Cómo Probar

1.  Asegúrese de que el Backend (.NET) y el Frontend (Angular) estén ejecutándose.
2.  Vaya a la opción de **Ingresar** en la barra superior o navegue a `/register`.
3.  Complete el formulario con Usuario: `admin` y Contraseña: `admin`.
4.  Una vez registrado, será redirigido al Login. Ingrese las mismas credenciales.
5.  Verifique que aparece su nombre en la barra superior y el botón de salir.
