# 🐱 Cat App - Frontend Dockerizado

## 📋 Descripción

Aplicación Angular dockerizada que se conecta con un backend Spring Boot para gestionar información de gatos. El frontend está optimizado con Nginx y utiliza un proxy para comunicarse con el backend.

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker Desktop instalado
- Backend dockerizado (`cat-backend:latest`)

### Ejecutar todo el stack
```bash
# Construir y ejecutar frontend + backend
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build
```

### Solo el frontend
```bash
# Construir imagen del frontend
docker build -t frontend .

# Ejecutar solo el frontend
docker run -p 80:80 frontend
```

## 📁 Estructura del Proyecto

```
Front-XpertGroup/
├── Dockerfile              # Multi-stage build para Angular + Nginx
├── docker-compose.yml      # Orquestación de servicios
├── nginx.conf             # Configuración de Nginx con proxy
├── .dockerignore          # Archivos excluidos del build
├── README_DOCKER.md       # Este archivo
├── package.json           # Dependencias de Angular
├── angular.json           # Configuración de Angular
└── src/                   # Código fuente de la aplicación
```

## 🔧 Configuración

### Puertos
- **Frontend**: http://localhost:80 (o http://localhost)
- **Backend**: http://localhost:8080 (accesible via proxy)

### Variables de Entorno
```yaml
# En docker-compose.yml
environment:
  THECATAPI_KEY: "live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP"
```

### Proxy Configuration
El frontend hace proxy automático de las llamadas `/api/*` al backend:
```nginx
location /api/ {
    proxy_pass http://backend:8080/;
    # ... configuración de headers
}
```

## 🛠️ Comandos Útiles

### Gestión de Contenedores
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend
docker-compose logs -f backend

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Reconstruir sin cache
docker-compose up --build --force-recreate

# Ver contenedores corriendo
docker ps
```

### Gestión de Imágenes
```bash
# Ver imágenes disponibles
docker images

# Eliminar imagen del frontend
docker rmi front-xpertgroup-frontend:latest

# Limpiar imágenes no utilizadas
docker image prune -a
```

### Desarrollo
```bash
# Ejecutar solo el frontend para desarrollo
docker run -p 80:80 -v $(pwd)/src:/app/src frontend

# Acceder al contenedor del frontend
docker exec -it front-xpertgroup-frontend-1 sh
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Puerto 80 ocupado
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Cambia 80 por 8080
```

#### 2. Backend no encontrado
```bash
# Verificar que la imagen existe
docker images | grep cat-backend

# Si no existe, construir el backend primero
cd ../Back-XpertGroup/cat-backend
docker build -t cat-backend:latest .
```

#### 3. Error de build de Angular
```bash
# Limpiar cache de Docker
docker system prune -a

# Reconstruir desde cero
docker-compose up --build --force-recreate
```

#### 4. Problemas de red entre contenedores
```bash
# Verificar red Docker
docker network ls

# Inspeccionar red
docker network inspect front-xpertgroup_app-network
```

### Logs de Debug
```bash
# Ver logs detallados del frontend
docker-compose logs frontend

# Ver logs del backend
docker-compose logs backend

# Ver logs de nginx
docker exec front-xpertgroup-frontend-1 tail -f /var/log/nginx/error.log
```

## 🧪 Testing

### Usuario de Prueba
- **Usuario**: `test`
- **Contraseña**: `test123`

### Endpoints de Prueba
```bash
# Frontend
curl http://localhost

# Backend (via proxy)
curl http://localhost/api/breeds

# Backend directo
curl http://localhost:8080/breeds
```

## 📊 Monitoreo

### Estado de los Servicios
```bash
# Ver estado de contenedores
docker-compose ps

# Ver uso de recursos
docker stats

# Ver procesos dentro del contenedor
docker exec front-xpertgroup-frontend-1 ps aux
```

### Métricas de Nginx
```bash
# Ver configuración de nginx
docker exec front-xpertgroup-frontend-1 nginx -t

# Ver logs de acceso
docker exec front-xpertgroup-frontend-1 tail -f /var/log/nginx/access.log
```

## 🔒 Seguridad

### Configuraciones de Seguridad
- Nginx configurado con headers de seguridad
- Proxy con headers apropiados
- Contenedores ejecutándose con usuarios no-root
- Variables de entorno para credenciales

### Recomendaciones
- Cambiar la API key en producción
- Usar secrets de Docker para credenciales
- Configurar HTTPS en producción
- Implementar rate limiting

