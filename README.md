Sistema de Gestión de Proyectos (Prototipo)
Prototipo avanzado de un Sistema de Gestión de Proyectos (SGP) para empresas, construido con React. Esta aplicación sirve como una base sólida para una herramienta interna, ofreciendo funcionalidades completas para el seguimiento, gestión y análisis de proyectos.

📜 Descripción
Este proyecto es una aplicación web de una sola página (SPA) que permite a los usuarios gestionar el ciclo de vida completo de los proyectos de una empresa. Desde la creación con formularios detallados, pasando por la visualización en dashboards analíticos, hasta la gestión de versiones y renovaciones de contratos.

✨ Características Principales
📊 Dashboard Analítico: Gráficos interactivos para visualizar proyectos por estado, prioridad y presupuesto por categoría.

🗂️ Gestión Completa de Proyectos: Funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) completas.

🕰️ Historial y Versionamiento: Cada cambio en un proyecto crea una nueva versión, asegurando una trazabilidad total.

🔄 Flujo de Renovación: Un formulario dedicado para renovar proyectos vencidos, actualizando su estado y fechas.

🔍 Búsqueda y Filtros: Búsqueda por múltiples campos y filtros por estado y prioridad.

🔔 Sistema de Notificaciones: Alertas para proyectos vencidos o por vencer.

↔️ Vistas Duales: Visualización de proyectos en formato de Tabla (ordenable) o Tarjetas.

📱 Diseño Responsivo: Interfaz adaptable a diferentes dispositivos.

🚀 Stack Tecnológico
React.js: Librería principal para la construcción de la interfaz de usuario.

Tailwind CSS: Framework de CSS para un diseño rápido, moderno y consistente.

Lucide React: Librería de iconos ligera y completa.

Recharts: Librería de gráficos para la creación del dashboard.

⚙️ Instalación y Puesta en Marcha
Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo local.

Prerrequisitos:

Node.js (v16 o superior)

NPM o Yarn

Pasos:

Clona el repositorio:

git clone https://github.com/[TU_USUARIO]/sistema-gestion-proyectos.git
cd sistema-gestion-proyectos

Instala las dependencias:

npm install

Instala Recharts (para los gráficos):

npm install recharts

Inicia el servidor de desarrollo:

npm start

La aplicación estará disponible en http://localhost:3000.

🏛️ Estructura del Prototipo
Para mantener la simplicidad, la lógica principal de este prototipo reside en el componente App.js, que gestiona:

El estado global de los proyectos.

La lógica de los modales (crear, editar, renovar).

El cálculo de notificaciones.

El filtrado, búsqueda y ordenamiento de los datos.

Los componentes de vista (DashboardView, ProjectTable, ProjectDetailView, etc.) reciben los datos procesados y se encargan únicamente de su representación.

roadmap: Pasos Futuros
Este prototipo es una base. Las siguientes mejoras son clave para llevarlo a producción:

[Prioridad Alta] Persistencia de Datos: Conectar la aplicación a un backend y una base de datos (ej. Firebase, Supabase, o una API REST propia) para que la información sea permanente.

Autenticación y Roles de Usuario: Implementar un sistema de inicio de sesión para gestionar permisos y visibilidad.

Módulo de Tareas y Colaboración: Añadir un sistema de comentarios y asignación de tareas dentro de cada proyecto.

Gestión de Archivos: Permitir adjuntar documentos a los proyectos.

Exportación a PDF/CSV: Generar reportes a partir de la información de los proyectos.

📄 Licencia
Este proyecto se distribuye bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

Prototipo desarrollado como base para una herramienta de gestión interna.
