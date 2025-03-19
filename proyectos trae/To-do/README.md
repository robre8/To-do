# Aplicación de Gestión de Tareas (To-Do App)

Esta es una aplicación completa de gestión de tareas con un backend en Spring Boot y un frontend en React.

## Características

- Crear, leer, actualizar y eliminar tareas
- Marcar tareas como completadas
- Filtrar tareas por estado
- Interfaz de usuario moderna y responsive

## Tecnologías Utilizadas

### Backend
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- Vite
- TailwindCSS
- Axios

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `backend/`: Contiene el código del servidor Spring Boot
- `frontend/`: Contiene el código de la aplicación React

## Requisitos Previos

- Java 17 o superior
- Node.js 16 o superior
- PostgreSQL

## Configuración y Ejecución

### Backend

1. Navega al directorio `backend/`
2. Configura la base de datos en `application.properties`
3. Ejecuta `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`)

### Frontend

1. Navega al directorio `frontend/`
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`

## Despliegue

- Backend: Configurado para despliegue en Render
- Frontend: Configurado para despliegue en Vercel