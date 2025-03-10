# Rutas y Endpoints de VirtualTech

Este documento describe la estructura de rutas de la aplicación **VirtualTech** y cómo se validan los endpoints utilizando **Express-Validator**, siguiendo las mejores prácticas y estándares de seguridad recomendados por **OWASP TOP 10**.

---

## Tabla de Contenidos

1. [Resumen](#resumen)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Endpoints y Validaciones](#endpoints-y-validaciones)
   - [Endpoints de Autenticación y Usuarios](#endpoints-de-autenticación-y-usuarios)
   - [Endpoints de Categorías y Cursos](#endpoints-de-categorías-y-cursos)
   - [Endpoints de Carrito y Transacciones](#endpoints-de-carrito-y-transacciones)
   - [Endpoints de Contenido e Interacciones](#endpoints-de-contenido-e-interacciones)
   - [Endpoints de Búsqueda y Subida de Archivos](#endpoints-de-búsqueda-y-subida-de-archivos)
4. [Buenas Prácticas OWASP y Express-Validator](#buenas-prácticas-owasp-y-express-validator)
5. [Cómo Contribuir](#cómo-contribuir)
6. [Licencia](#licencia)

---

## Resumen

La aplicación **VirtualTech** expone múltiples endpoints RESTful para interactuar con los distintos recursos (usuarios, cursos, categorías, etc.). Cada ruta se valida utilizando **Express-Validator** para asegurar que los datos recibidos sean correctos y seguros, mitigando vulnerabilidades comunes según los estándares **OWASP TOP 10**.

---

Cada archivo de rutas define endpoints específicos y utiliza middlewares de **Express-Validator** para:

- Validar parámetros, query strings y cuerpos de solicitudes.
- Sanitizar los datos de entrada.
- Asegurarse de que los datos cumplan con los formatos y restricciones establecidos.

---

## Endpoints y Validaciones

### Endpoints de Autenticación y Usuarios

- **POST `/api/auth/register`**
  - **Validaciones:**
    - Email: formato correcto, no vacío.
    - Contraseña: longitud mínima y complejidad.
    - Nombre: no vacío y sanitizado.
- **POST `/api/auth/login`**
  - **Validaciones:**
    - Email y contraseña: requeridos y verificados.
- **GET `/api/users/:id`**
  - **Validaciones:**
    - Parámetro `id`: formato UUID o numérico según el esquema.

### Endpoints de Categorías y Cursos

- **GET `/api/categories`**
  - Consulta sin parámetros, pero se aplican filtros sanitizados si se reciben query strings.
- **POST `/api/categories`**
  - **Validaciones:**
    - Nombre: requerido, sin caracteres maliciosos.
- **GET `/api/courses`**
  - Permite filtrado por parámetros, sanitizando inputs para evitar inyección.
- **POST `/api/courses`**
  - **Validaciones:**
    - Título, descripción y precio: requeridos y correctamente formateados.
    - ID de categoría y usuario: validados y sanitizados.

### Endpoints de Carrito y Transacciones

- **GET `/api/cart`**
  - Endpoint protegido para el usuario autenticado.
- **POST `/api/cart` y `/api/cart/item`**
  - **Validaciones:**
    - Verificar existencia y formato de `courseId` y cantidad.
    - Sanitizar datos para prevenir inyección.

### Endpoints de Contenido e Interacciones

- **POST `/api/reviews`**
  - **Validaciones:**
    - Rating: número dentro de un rango aceptable.
    - Comentario: sanitizado y con límite de caracteres.
- **POST `/api/qa` y `/api/responses`**
  - **Validaciones:**
    - Título y descripción: requeridos y sanitizados para evitar XSS e inyección.
- **POST `/api/sections`**
  - **Validaciones:**
    - Contenido y orden: verificaciones de tipo y formato.

### Endpoints de Búsqueda y Subida de Archivos

- **GET `/api/search`**
  - **Validaciones:**
    - Parámetro `q`: requerido y sanitizado para construir consultas REGEX seguras.
- **POST `/api/upload`**
  - **Validaciones:**
    - Verificar la presencia del archivo (`file`) y su tipo MIME.
    - Validar el parámetro `target` (course o profile) para evitar usos indebidos.

---

## Buenas Prácticas OWASP y Express-Validator

- **Inyección:**  
  Se aplican validaciones y sanitizaciones en todos los campos de entrada para prevenir inyección SQL y NoSQL.
- **Cross-Site Scripting (XSS):**  
  Todos los datos que puedan ser renderizados en el cliente se sanitizan para evitar la inserción de scripts maliciosos.

- **Autenticación y Sesiones:**  
  Los endpoints sensibles están protegidos mediante middleware de autenticación y validación de tokens.

- **Validación de Datos:**  
  Express-Validator asegura que cada petición cumpla con el formato esperado, evitando errores y vulnerabilidades.

- **Control de Errores:**  
  Se implementan manejadores de errores que informan de manera segura sin exponer detalles internos del sistema.

- **Registro y Monitoreo:**  
  Los intentos fallidos y patrones inusuales se registran para facilitar la detección de actividades sospechosas.

Esta combinación de técnicas y herramientas garantiza que la API de **VirtualTech** cumple con altos estándares de seguridad y robustez.

---

## Cómo Contribuir

Si deseas contribuir a la mejora de las rutas y su validación:

1. **Fork** el repositorio.
2. Crea una nueva rama para tu funcionalidad o mejora: git checkout -b feature/nueva-validacion
3. Realiza los cambios asegurándote de incluir pruebas unitarias y de integración.
4. Envía un Pull Request con una descripción detallada de los cambios.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT).  
Consulta el archivo LICENSE para más detalles.

---

¡Gracias por revisar la documentación de las rutas de **VirtualTech**! Si tienes dudas o sugerencias, no dudes en abrir un issue o contactarnos.
