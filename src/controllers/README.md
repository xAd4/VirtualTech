# Controladores de Modelos - VirtualTech

Este documento describe los controladores responsables de gestionar las operaciones CRUD y demás interacciones HTTP para los modelos de la aplicación **VirtualTech**. Cada controlador se encarga de recibir y responder a las solicitudes HTTP, delegando la lógica de negocio y validación a la capa de servicios correspondiente.

---

## Tabla de Contenidos

1. [Resumen](#resumen)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Controladores de Modelos](#controladores-de-modelos)
   - [User Controller](#user-controller)
   - [Category Controller](#category-controller)
   - [Course Controller](#course-controller)
   - [Cart y CartItem Controller](#cart-y-cartitem-controller)
   - [CoursesPaid Controller](#coursespayed-controller)
   - [Reviews Controller](#reviews-controller)
   - [Q&A y Response Controllers](#qa-y-response-controllers)
   - [Section Controller](#section-controller)
4. [Separación de Responsabilidades](#separacion-de-responsabilidades)
5. [Cómo Contribuir](#como-contribuir)
6. [Licencia](#licencia)

---

## Resumen

La aplicación **VirtualTech** cuenta con un conjunto de controladores que se encargan de gestionar la comunicación HTTP para cada uno de los modelos definidos (usuarios, cursos, carrito, etc.). Estos controladores exponen endpoints RESTful para realizar operaciones como crear, leer, actualizar y eliminar recursos. La lógica interna y las validaciones se encuentran implementadas en la carpeta de **servicios**, lo que garantiza una separación clara entre la interfaz HTTP y el procesamiento de datos.

---

---

## Controladores de Modelos

### User Controller

- **Responsabilidad:**  
  Gestiona operaciones CRUD para los usuarios, como registro, actualización de perfil, eliminación y consulta de datos de usuario.
- **Endpoints Típicos:**
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/users`
  - `PUT /api/users/:id`
  - `DELETE /api/users/:id`
- **Nota:**  
  La lógica de autenticación y validación de datos se delega a `user.service.js`.

---

### Category Controller

- **Responsabilidad:**  
  Maneja la creación, lectura, actualización y eliminación de categorías, permitiendo organizar los cursos.
- **Endpoints Típicos:**
  - `GET /api/categories`
  - `GET /api/categories/:id`
  - `POST /api/categories`
  - `PUT /api/categories/:id`
  - `DELETE /api/categories/:id`
- **Nota:**  
  La validación y la verificación del estado se implementan en `category.service.js`.

---

### Course Controller

- **Responsabilidad:**  
  Administra las operaciones sobre cursos, incluyendo la vinculación con categorías y usuarios (profesores).
- **Endpoints Típicos:**
  - `GET /api/courses`
  - `GET /api/courses/:id`
  - `POST /api/courses`
  - `PUT /api/courses/:id`
  - `DELETE /api/courses/:id`
- **Nota:**  
  Toda la lógica de negocio se delega a `course.service.js`.

---

### Cart y CartItem Controller

- **Responsabilidad:**  
  Gestiona la interacción con el carrito de compras y los ítems asociados a éste, permitiendo añadir, actualizar o remover cursos del carrito.
- **Endpoints Típicos:**
  - `GET /api/cart` (por usuario)
  - `POST /api/cart` (crear carrito o agregar ítem)
  - `PUT /api/cart/item/:id` (actualizar ítem)
  - `DELETE /api/cart/item/:id`
- **Nota:**  
  La lógica de cálculo de precios y validaciones se encuentra en `cart.service.js`.

---

### CoursesPaid Controller

- **Responsabilidad:**  
  Registra y consulta el historial de compras de cursos realizados por los usuarios.
- **Endpoints Típicos:**
  - `GET /api/coursesPaid` (por usuario)
  - `POST /api/coursesPaid`
- **Nota:**  
  La confirmación de pago y actualizaciones de estado se delegan a `coursesPaid.service.js`.

---

### Reviews Controller

- **Responsabilidad:**  
  Permite que los usuarios dejen reseñas y comentarios sobre los cursos.
- **Endpoints Típicos:**
  - `GET /api/reviews?courseId=...`
  - `POST /api/reviews`
  - `PUT /api/reviews/:id`
  - `DELETE /api/reviews/:id`
- **Nota:**  
  Se asegura la moderación y validación de reseñas a través de `reviews.service.js`.

---

### Q&A y Response Controllers

- **Q&A Controller:**

  - **Responsabilidad:**  
    Gestiona las preguntas relacionadas con los cursos.
  - **Endpoints Típicos:**
    - `GET /api/qa?courseId=...`
    - `POST /api/qa`
    - `PUT /api/qa/:id`
    - `DELETE /api/qa/:id`
  - **Nota:**  
    La lógica para marcar preguntas como resueltas se encuentra en `qa.service.js`.

- **Response Controller:**
  - **Responsabilidad:**  
    Maneja las respuestas a las preguntas, permitiendo la interacción entre estudiantes y profesores.
  - **Endpoints Típicos:**
    - `GET /api/responses?qaId=...`
    - `POST /api/responses`
    - `PUT /api/responses/:id`
    - `DELETE /api/responses/:id`
  - **Nota:**  
    La validación y el manejo de respuestas se delegan a `response.service.js`.

---

### Section Controller

- **Responsabilidad:**  
  Administra la creación y organización de secciones dentro de cada curso, facilitando la estructura del contenido.
- **Endpoints Típicos:**
  - `GET /api/sections?courseId=...`
  - `POST /api/sections`
  - `PUT /api/sections/:id`
  - `DELETE /api/sections/:id`
- **Nota:**  
  Se delega la gestión del orden y contenido a `section.service.js`.

---

## Separación de Responsabilidades

- **Controladores:**  
  Se encargan exclusivamente de la comunicación HTTP: recibir solicitudes, enviar respuestas y gestionar el estado de las peticiones.
- **Servicios:**  
  Toda la lógica de negocio, validaciones, interacciones con la base de datos y procesamiento se implementa en la carpeta de servicios. Esto facilita la escalabilidad, el mantenimiento y las pruebas unitarias de la aplicación.

---

## Cómo Contribuir

Si deseas contribuir a la mejora o expansión de estos controladores:

1. **Fork** el repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección:
