# Servicios de VirtualTech

Este documento detalla la capa de **servicios** de la aplicación **VirtualTech**, la cual contiene la lógica de negocio detrás de los controladores. La arquitectura separa la lógica de negocio de la comunicación HTTP, permitiendo que los controladores se centren únicamente en recibir y responder a las solicitudes, mientras que los servicios gestionan validaciones, procesos, interacciones con la base de datos y reglas de negocio.

---

## Tabla de Contenidos

1. [Resumen](#resumen)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Servicios Principales](#servicios-principales)
   - [Search Service](#search-service)
   - [Upload Service](#upload-service)
   - [User Service](#user-service)
   - [Category Service](#category-service)
   - [Course Service](#course-service)
   - [Cart Service](#cart-service)
   - [CoursesPaid Service](#coursespayed-service)
   - [Reviews Service](#reviews-service)
   - [Q&A y Response Service](#qa-y-response-service)
   - [Section Service](#section-service)
4. [Ventajas de la Separación de Lógica](#ventajas-de-la-separacion-de-logica)
5. [Cómo Contribuir](#como-contribuir)
6. [Licencia](#licencia)

---

## Resumen

La capa de servicios en **VirtualTech** se encarga de:

- Ejecutar la lógica de negocio, validaciones y reglas de interacción.
- Gestionar operaciones complejas como búsquedas con expresiones regulares, procesamiento de pagos, gestión de archivos, entre otros.
- Aislar la lógica de negocio de la capa de presentación, facilitando la mantenibilidad y escalabilidad de la aplicación.
- Realizar la interacción con la base de datos y otros recursos externos, asegurando que los controladores reciban respuestas consistentes.

---

Cada servicio implementa funciones específicas que son invocadas por los controladores correspondientes.

---

## Servicios Principales

### Search Service

- **Funcionalidad:**  
  Se encarga de realizar búsquedas utilizando expresiones regulares (REGEX) sobre los modelos de **categorías** y **cursos**.
- **Responsabilidades:**
  - Recibir el término de búsqueda y construir la consulta REGEX.
  - Filtrar y combinar resultados de categorías y cursos.
  - Retornar los resultados de forma estructurada para su uso en el controlador.

### Upload Service

- **Funcionalidad:**  
  Maneja la lógica para la subida de imágenes, ya sea para cursos o para perfiles de usuario.
- **Responsabilidades:**
  - Validar el tipo y tamaño del archivo.
  - Procesar la carga del archivo (posiblemente a un sistema de almacenamiento en la nube o local).
  - Generar la URL de acceso a la imagen y retornarla al controlador.

### User Service

- **Funcionalidad:**  
  Gestiona operaciones relacionadas con los usuarios, como creación, actualización, eliminación y consulta.
- **Responsabilidades:**
  - Validar la integridad y unicidad de los datos del usuario.
  - Implementar lógica de autenticación, verificación y roles.
  - Interactuar con la base de datos para persistir los cambios.

### Category Service

- **Funcionalidad:**  
  Encapsula la lógica de negocio para gestionar las categorías de cursos.
- **Responsabilidades:**
  - Crear, actualizar y eliminar categorías.
  - Validar que las categorías cumplan con los estándares requeridos (por ejemplo, estado activo/inactivo).
  - Facilitar la organización y clasificación de cursos.

### Course Service

- **Funcionalidad:**  
  Gestiona la lógica detrás de la creación y administración de cursos.
- **Responsabilidades:**
  - Validar y formatear la información de los cursos.
  - Asociar cursos a categorías y usuarios (profesores).
  - Manejar actualizaciones y eliminaciones seguras de cursos.

### Cart Service

- **Funcionalidad:**  
  Implementa la lógica necesaria para la gestión del carrito de compras y sus ítems asociados.
- **Responsabilidades:**
  - Calcular precios totales, descuentos y validar la disponibilidad de los cursos.
  - Gestionar la adición, modificación y eliminación de ítems en el carrito.
  - Coordinar la conversión de un carrito en una transacción de compra.

### CoursesPaid Service

- **Funcionalidad:**  
  Se encarga del registro y administración de los cursos adquiridos por los usuarios.
- **Responsabilidades:**
  - Validar y registrar transacciones de compra.
  - Actualizar el estado de los cursos (activo, completado, etc.) según la interacción del usuario.
  - Proveer un historial consolidado de compras.

### Reviews Service

- **Funcionalidad:**  
  Gestiona las reseñas y comentarios de los usuarios sobre los cursos.
- **Responsabilidades:**
  - Validar la entrada de reseñas y gestionar la moderación de comentarios.
  - Calcular y actualizar calificaciones promedio de los cursos.
  - Facilitar la consulta y filtrado de reseñas por curso.

### Q&A y Response Service

- **Q&A Service:**

  - **Funcionalidad:**  
    Administra las preguntas realizadas por los usuarios sobre los cursos.
  - **Responsabilidades:**
    - Validar y registrar preguntas.
    - Permitir actualizaciones y eliminaciones según la interacción del usuario o moderadores.

- **Response Service:**
  - **Funcionalidad:**  
    Gestiona las respuestas a las preguntas planteadas, permitiendo una interacción colaborativa.
  - **Responsabilidades:**
    - Validar respuestas y asociarlas a la pregunta correspondiente.
    - Asegurar que la lógica de respuesta mantenga la integridad de la conversación.

### Section Service

- **Funcionalidad:**  
  Encapsula la lógica para la administración de secciones dentro de cada curso.
- **Responsabilidades:**
  - Organizar y validar el contenido de cada sección.
  - Gestionar el orden y la estructura de la información presentada en el curso.
  - Facilitar la actualización y eliminación de secciones cuando sea necesario.

---

## Ventajas de la Separación de Lógica

- **Modularidad:**  
  Permite actualizar o extender la lógica de negocio sin afectar la interfaz HTTP, facilitando el mantenimiento.
- **Testabilidad:**  
  Al estar aislados, los servicios pueden ser testeados de forma unitaria, garantizando la estabilidad de la aplicación.
- **Escalabilidad:**  
  Facilita la integración de nuevas funcionalidades, ya que la lógica de negocio se encuentra organizada y centralizada.
- **Reutilización:**  
  Los servicios pueden ser reutilizados en diferentes controladores o contextos, reduciendo la duplicación de código.

---

## Cómo Contribuir

Para contribuir a la capa de servicios de VirtualTech:

1. **Fork** el repositorio.
2. Crea una rama para la nueva funcionalidad o corrección: git checkout -b feature/nueva-funcionalidad
3. Realiza tus cambios y asegúrate de incluir pruebas unitarias para la lógica implementada.
4. Haz commit de los cambios y envía un Pull Request con una descripción detallada.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT).  
Consulta el archivo LICENSE para más detalles.

---

¡Gracias por revisar la documentación de la capa de servicios en **VirtualTech**! Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactarnos.
