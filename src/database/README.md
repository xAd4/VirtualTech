# Base de Datos - VirtualTech (MongoDB)

Este documento describe la estructura y diseño de la base de datos utilizada en **VirtualTech**, la cual se implementa en MongoDB. Se detalla la organización de las colecciones, los esquemas principales y las consideraciones para optimización y escalabilidad.

---

## Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Colecciones y Esquemas](#colecciones-y-esquemas)
   - [Usuarios (Users)](#usuarios-users)
   - [Categorías (Categories)](#categorías-categories)
   - [Cursos (Courses)](#cursos-courses)
   - [Carrito y Elementos del Carrito (Cart y CartItem)](#carrito-y-elementos-del-carrito-cart-y-cartitem)
   - [Cursos Pagados (CoursesPaid)](#cursos-pagados-coursespayed)
   - [Reseñas (Reviews)](#reseñas-reviews)
   - [Preguntas y Respuestas (Q&A y Response)](#preguntas-y-respuestas-qa-y-response)
   - [Secciones (Section)](#secciones-section)
3. [Relaciones y Modelado](#relaciones-y-modelado)
4. [Índices y Optimización](#índices-y-optimización)
5. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
6. [Cómo Contribuir](#cómo-contribuir)
7. [Licencia](#licencia)

---

## Visión General

La base de datos de VirtualTech está diseñada para soportar una aplicación de e-learning escalable, flexible y segura. Al utilizar MongoDB se aprovecha la naturaleza NoSQL para gestionar estructuras de datos dinámicas, permitiendo la evolución y adaptación de los modelos de datos conforme crece la plataforma.

---

## Colecciones y Esquemas

### Usuarios (Users)

- **Descripción:**  
  Almacena la información de los usuarios (estudiantes, profesores, administradores).
- **Campos Clave:**
  - `name`: Nombre completo del usuario.
  - `email`: Correo electrónico único.
  - `password`: Contraseña cifrada.
  - `img`: URL de la imagen de perfil.
  - `role`: Rol del usuario (User, Teacher, Admin).
  - `state`: Estado de la cuenta (activo/inactivo).
  - `google`: Indicador de autenticación mediante Google.

---

### Categorías (Categories)

- **Descripción:**  
  Organiza los cursos en categorías temáticas.
- **Campos Clave:**
  - `name`: Nombre de la categoría.
  - `state`: Estado de la categoría (activa/inactiva).

---

### Cursos (Courses)

- **Descripción:**  
  Contiene la información detallada de cada curso.
- **Campos Clave:**
  - `categoryId`: Referencia a la categoría (almacenada como ObjectId).
  - `userId`: Referencia al profesor creador.
  - `name`: Título del curso.
  - `description`: Descripción detallada del curso.
  - `img`: Imagen representativa del curso.
  - `price`: Precio del curso.
  - `createdAt` y `updatedAt`: Fechas de creación y última actualización.

---

### Carrito y Elementos del Carrito (Cart y CartItem)

- **Carrito (Cart):**

  - **Descripción:**  
    Registra el carrito de compras asociado a un usuario.
  - **Campos Clave:**
    - `userId`: Referencia al usuario propietario.
    - `totalPrice`: Suma total de los ítems en el carrito.
    - `createdAt` y `updatedAt`.

- **Elementos del Carrito (CartItem):**
  - **Descripción:**  
    Cada documento representa un curso añadido al carrito.
  - **Campos Clave:**
    - `cartId`: Referencia al carrito.
    - `courseId`: Referencia al curso.
    - `quantity`: Cantidad de veces que se añadió el curso.
    - `totalPrice`: Precio total para ese ítem.

---

### Cursos Pagados (CoursesPaid)

- **Descripción:**  
  Almacena el historial de cursos adquiridos por los usuarios.
- **Campos Clave:**
  - `userId`: Referencia al usuario comprador.
  - `courseId`: Referencia al curso comprado.
  - `purchaseDate`: Fecha de la compra.
  - `status`: Estado del curso para el usuario (por ejemplo, activo o completado).

---

### Reseñas (Reviews)

- **Descripción:**  
  Registra las reseñas y calificaciones de los cursos realizadas por los usuarios.
- **Campos Clave:**
  - `courseId`: Referencia al curso.
  - `userId`: Referencia al autor de la reseña.
  - `rating`: Calificación numérica (por ejemplo, 1-5).
  - `description`: Comentario textual.
  - `createdAt`: Fecha de la reseña.

---

### Preguntas y Respuestas (Q&A y Response)

- **Preguntas (Q&A):**

  - **Descripción:**  
    Documentos que contienen las preguntas realizadas por los usuarios sobre los cursos.
  - **Campos Clave:**
    - `userId`: Usuario que realiza la pregunta.
    - `courseId`: Curso relacionado.
    - `title`: Título de la pregunta.
    - `description`: Detalle de la pregunta.
    - `createdAt`.

- **Respuestas (Response):**
  - **Descripción:**  
    Contienen las respuestas a las preguntas planteadas.
  - **Campos Clave:**
    - `qaId`: Referencia a la pregunta.
    - `userId`: Usuario que responde.
    - `description`: Contenido de la respuesta.
    - `createdAt`.

---

### Secciones (Section)

- **Descripción:**  
  Estructura el contenido de cada curso en secciones o módulos.
- **Campos Clave:**
  - `courseId`: Referencia al curso.
  - `content`: Lista de recursos (videos, textos, pdfs, etc.).
  - `contentCount`: Número de recursos en la sección.
  - `totalHours`: Tiempo total estimado para completar la sección.

---

## Relaciones y Modelado

Aunque MongoDB no impone relaciones estrictas mediante claves foráneas, el diseño de VirtualTech utiliza referencias entre colecciones (almacenadas como ObjectId) para mantener la integridad de la información. Las relaciones principales son:

- **Users a Courses:**  
  Un profesor (User) puede crear múltiples cursos.
- **Categories a Courses:**  
  Cada curso está asociado a una categoría.
- **Users a Cart:**  
  Cada usuario tiene un carrito que contiene múltiples CartItems.
- **Courses a Reviews, Q&A y Section:**  
  Un curso puede tener múltiples reseñas, preguntas y secciones.
- **Q&A a Response:**  
  Una pregunta puede recibir varias respuestas.

---

## Índices y Optimización

Para mejorar el rendimiento y la escalabilidad, se han implementado índices en los campos más consultados:

- **Índice en `email`** en la colección **Users** para optimizar la autenticación y búsqueda.
- **Índices en `categoryId` y `userId`** en la colección **Courses** para agilizar las consultas relacionadas.
- **Índices compuestos** en colecciones de transacciones (Cart y CoursesPaid) para acelerar la recuperación de información.
- Uso de **Redis** como capa de cacheo para consultas frecuentes, reduciendo la latencia en operaciones críticas.

---

## Consideraciones de Seguridad

La seguridad de la base de datos es prioritaria. Algunas medidas implementadas incluyen:

- **Validación y Sanitización de Datos:**  
  Se aplican reglas estrictas para evitar inyección de código y otros ataques.
- **Control de Accesos:**  
  Se utiliza autenticación basada en tokens y roles para restringir el acceso a la información sensible.
- **Backups y Replicación:**  
  Estrategias de backup y replicación garantizan la disponibilidad y resiliencia de los datos.
- **Monitoreo y Auditoría:**  
  Se implementan mecanismos para el monitoreo continuo y la auditoría de operaciones en la base de datos.

---

## Cómo Contribuir

Si deseas colaborar en la mejora o extensión del modelo de datos:

1. **Fork** el repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección: git checkout -b feature/nueva-estructura-db
3. Realiza tus cambios, asegurándote de actualizar la documentación y pruebas correspondientes.
4. Haz commit de los cambios y envía un Pull Request detallando las modificaciones realizadas.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT).  
Consulta el archivo LICENSE para más detalles.

---

¡Gracias por revisar la documentación de la base de datos de **VirtualTech**! Para cualquier duda o sugerencia, no dudes en abrir un issue o contactarnos.
