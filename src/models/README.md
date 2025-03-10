# VirtualTech - Diagrama y Modelos

Este repositorio define la estructura de la base de datos para la aplicación de e-learning **VirtualTech**. A continuación, se describen los modelos principales, sus campos y la lógica de relaciones que se muestra en el diagrama.

---

## Tabla de Contenidos

1. [Resumen General](#resumen-general)
2. [Modelo: User](#modelo-user)
3. [Modelo: Category](#modelo-category)
4. [Modelo: Course](#modelo-course)
5. [Modelo: Cart y CartItem](#modelo-cart-y-cartitem)
6. [Modelo: CoursesPaid](#modelo-coursespaid)
7. [Modelo: Reviews](#modelo-reviews)
8. [Modelo: Q&A y Response](#modelo-qa-y-response)
9. [Modelo: Section](#modelo-section)
10. [Relaciones Principales](#relaciones-principales)
11. [Contribuciones](#contribuciones)
12. [Licencia](#licencia)

---

## Resumen General

El diagrama está orientado a cubrir las funcionalidades de una plataforma de e-learning:

- **Usuarios** (estudiantes, profesores, administradores)
- **Cursos** organizados por categorías
- **Carrito** de compra y manejo de transacciones
- **Contenido** (secciones, materiales, etc.)
- **Interacciones** entre usuarios y cursos (reseñas, preguntas, respuestas)

La siguiente imagen representa la estructura de la base de datos:

> _Inserta aquí la imagen del diagrama (o una ruta hacia ella)_

---

## Modelo: User

Tabla: **User**  
Campos principales:

- **name**: Nombre completo del usuario.
- **email**: Correo electrónico único para cada usuario.
- **password**: Contraseña cifrada.
- **img**: URL de la imagen de perfil.
- **role**: Rol del usuario (ej. `User`, `Teacher`, `Admin`).
- **state**: Estado de la cuenta (ej. activo/inactivo).
- **google**: Boolean que indica si se registró a través de Google (o token de Google).

Este modelo gestiona la información de autenticación y permisos de acceso en la plataforma.

---

## Modelo: Category

Tabla: **Category**  
Campos principales:

- **name**: Nombre de la categoría (ej. Programación, Diseño, Marketing).
- **state**: Estado de la categoría (activa/inactiva).

Permite organizar los cursos en categorías para facilitar la navegación y búsqueda.

---

## Modelo: Course

Tabla: **Course**  
Campos principales:

- **categoryId**: Hace referencia a la categoría a la que pertenece el curso.
- **img**: Imagen promocional del curso.
- **userId** (Teacher): Usuario que creó o imparte el curso.
- **name**: Título o nombre del curso.
- **description**: Descripción detallada.
- **price**: Precio de venta del curso.
- **createdAt** y **updatedAt**: Fechas de creación y última actualización.

Representa el curso como tal, con su información principal. Cada curso está asociado a una categoría y a un profesor.

---

## Modelo: Cart y CartItem

### Cart

Tabla: **Cart**  
Campos principales:

- **userId**: Usuario propietario del carrito.
- **totalPrice**: Precio total de los ítems añadidos.
- **createdAt**, **updatedAt**: Fechas de creación y actualización.

### CartItem

Tabla: **CartItem**  
Campos principales:

- **cartId**: Referencia al carrito al que pertenece.
- **courseId**: Curso que se está añadiendo al carrito.
- **totalPrice**: Precio total del ítem (por cantidad).
- **quantity**: Cantidad de cursos (en la mayoría de casos será 1).

Este par de tablas maneja la lógica de compras antes de que el usuario finalice la transacción.

---

## Modelo: CoursesPaid

Tabla: **CoursesPaid**  
Campos principales:

- **userId**: Usuario que realizó la compra.
- **courseId**: Curso comprado.
- **purchaseDate**: Fecha en la que se concretó la compra.
- **status**: Estado del curso para el usuario (ej. `Active`, `Completed`).

Registra el historial de compras de cursos por parte de los usuarios.

---

## Modelo: Reviews

Tabla: **Reviews**  
Campos principales:

- **courseId**: Referencia al curso reseñado.
- **userId**: Usuario que deja la reseña.
- **rating**: Calificación (ej. 1-5 estrellas).
- **description**: Comentario o reseña del usuario.
- **createdAt**: Fecha de la reseña.

Permite que los estudiantes valoren y comenten sus experiencias en cada curso.

---

## Modelo: Q&A y Response

### Q&A

Tabla: **Q&A**  
Campos principales:

- **userId**: Usuario que hace la pregunta.
- **courseId**: Curso al que se refiere la pregunta.
- **title**: Título de la pregunta.
- **description**: Detalle de la duda o pregunta.
- **createdAt**: Fecha de creación.

### Response

Tabla: **Response**  
Campos principales:

- **userId**: Usuario que responde la pregunta (puede ser el profesor u otro estudiante).
- **description**: Contenido de la respuesta.
- **createdAt**: Fecha de la respuesta.

Esta sección permite la interacción entre estudiantes y profesores para aclarar dudas.

---

## Modelo: Section

Tabla: **Section**  
Campos principales:

- **courseId**: Curso al que pertenece la sección.
- **content**: Lista o conjunto de recursos (videos, textos, pdfs, etc.).
- **contentCount**: Número de elementos de contenido en la sección.
- **totalHours**: Tiempo total estimado de la sección.

Permite subdividir el curso en partes lógicas (secciones) y agrupar materiales relacionados.

---

## Relaciones Principales

- **User** 1 - N **Cart**  
  Un usuario puede tener un carrito activo.

- **Cart** 1 - N **CartItem**  
  Un carrito puede contener varios ítems.

- **User** 1 - N **CoursesPaid**  
  Un usuario puede comprar varios cursos.

- **Course** 1 - N **Reviews**  
  Un curso puede tener múltiples reseñas.

- **User** 1 - N **Reviews**  
  Un usuario puede reseñar varios cursos.

- **Course** 1 - N **Q&A**  
  Un curso puede tener múltiples preguntas.

- **Q&A** 1 - N **Response**  
  Una pregunta puede tener múltiples respuestas.

- **Course** 1 - N **Section**  
  Un curso se divide en varias secciones.

- **Category** 1 - N **Course**  
  Una categoría puede contener varios cursos.

---

## Contribuciones

Si deseas contribuir al desarrollo de **VirtualTech**, puedes:

1. Hacer un fork de este repositorio.
2. Crear una rama con tu nueva funcionalidad o mejora (`git checkout -b feature/nueva-funcionalidad`).
3. Hacer commit de tus cambios y hacer push a la rama.
4. Abrir un Pull Request y describir los cambios realizados.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT).  
Si tienes dudas sobre el uso de esta licencia, por favor revisa el enlace anterior o contacta a los responsables del proyecto.

---

¡Gracias por tu interés en **VirtualTech**!  
Si tienes preguntas adicionales sobre el diagrama o la arquitectura, no dudes en abrir un [issue](#) o contactarnos directamente.
