# Cat App - Frontend Angular

Una aplicación Angular moderna para explorar razas de gatos, con funcionalidades de autenticación y búsqueda.

## Características

### Vista 1 - Exploración de Gatos
- Lista desplegable con todas las razas de gatos disponibles
- Visualización detallada de la raza seleccionada
- Carrusel de imágenes para cada raza
- Información completa: descripción, temperamento, características
- Barras de progreso para mostrar características de la raza

### Vista 2 - Búsqueda y Filtrado
- Campo de búsqueda por texto
- Tabla responsiva con información de razas
- Filtrado en tiempo real
- Visualización de características principales

### Vista 3 - Login
- Formulario de autenticación
- Validación de campos
- Integración con backend
- Redirección automática después del login

### Vista 4 - Registro
- Formulario de registro completo
- Validación de contraseñas
- Campos requeridos: nombre, apellido, usuario, email, contraseña
- Integración con backend

### Vista 5 - Perfil Protegido
- Vista protegida por guard de autenticación
- Información del usuario logueado
- Acciones rápidas
- Avatar con iniciales del usuario

## Tecnologías Utilizadas

- **Angular 16** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Componentes de UI
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación
- **Angular Forms** - Manejo de formularios
- **Angular HTTP Client** - Comunicación con APIs

## Arquitectura

La aplicación sigue los principios de Clean Architecture y SOLID:

- **Models**: Interfaces TypeScript para tipos de datos
- **Services**: Lógica de negocio y comunicación con APIs
- **Components**: Componentes reutilizables y modulares
- **Guards**: Protección de rutas
- **Modules**: Organización modular del código

## Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd cat-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   
   Asegúrate de que tu backend Spring Boot esté ejecutándose en `http://localhost:8080`
   
   Si tu backend está en una URL diferente, actualiza la URL en:
   `src/app/services/auth.service.ts` línea 12

4. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   
   La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── cats/
│   │   ├── profile/
│   │   └── search/
│   ├── guards/
│   ├── models/
│   ├── services/
│   ├── app.component.*
│   └── app.module.ts
├── assets/
├── styles.scss
├── main.ts
└── index.html
```

## APIs Utilizadas

### The Cat API
- **Base URL**: `https://api.thecatapi.com/v1`
- **API Key**: `live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP`

### Endpoints del Backend
- **Login**: `GET /login`
- **Register**: `GET /register`

## Funcionalidades Principales

### Autenticación
- Login con usuario y contraseña
- Registro de nuevos usuarios
- Guard de autenticación para rutas protegidas
- Persistencia de sesión en localStorage

### Gestión de Gatos
- Listado completo de razas
- Búsqueda por nombre
- Visualización detallada con imágenes
- Características y estadísticas de cada raza

### Diseño Responsivo
- Adaptable a diferentes tamaños de pantalla
- Componentes Material Design
- Navegación intuitiva
- Interfaz moderna y atractiva

## Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run watch` - Construye la aplicación en modo watch

## Configuración del Backend

Para que la aplicación funcione correctamente, asegúrate de que tu backend Spring Boot tenga:

1. **CORS configurado** para permitir requests desde `http://localhost:4200`
2. **Endpoints funcionando**:
   - `GET /login` con parámetros `username` y `password`
   - `GET /register` con parámetros de registro
3. **Base de datos configurada** para usuarios

## Pruebas

La aplicación incluye:
- Pruebas unitarias configuradas
- Validación de formularios
- Manejo de errores
- Estados de carga

## Despliegue

Para desplegar la aplicación:

1. **Construir para producción**
   ```bash
   npm run build
   ```

2. **Los archivos generados estarán en `dist/cat-app/`**

3. **Desplegar en tu servidor web preferido**

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Contacto

Para preguntas o soporte, contacta al equipo de desarrollo. 