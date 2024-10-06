# Template Base Express

**Empieza tu backend en express** aplicando buenas practicas y utilizando la arquitectura hexagonal con vertical slicing. Todo esto de forma rapida y organizada.

### Características
- **Usuarios**: CRUD de usuarios.
- **Personas**: CRUD de personas.
- **Roles y Servicios**: Asigna recursos mediante codigos, estos se los asignas a los roles y cada persona puede tener distintos roles.
- **Middlewares**: Middlewares predefinidos.
- **Autenticación**: JWT y sistema White List incluido.

### Alternativas
Existen diferentes Frameworks como Django que cuenta con estas caracteristicas y más para desarrollar un backend robusto, sin embargo esta plantilla cuenta con la base escalable para una arquitectura basada en microservicios con distribución hexagonal, pruebala y hazla tan flexible como la necesites.

## Insignias

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Tecnologías Utilizadas
- **Express**: Para la construcción del servidor web.
- **TypeScript**: Como lenguaje de tipado para mejorar la seguridad.
- **Sequelize**: ORM para gestionar la base de datos.
- **NodeJS**: Marco de trabajo de Express.
- **Docker**: Containerización de bases de datos.
- **GIT**: Sistema de versionamiento de código.
- **Postgresql**: Sistema de base de datos de la aplicación.
- **Redis**: Sistema de base de datos de caché.

<p align="left">
  <img src="https://github.com/user-attachments/assets/b2972b29-f40e-488a-aadd-ef4372659a4e" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/13496a22-10a0-4e91-8ec2-7286f43ee6e3" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/3824bcf1-0ba3-4881-a7d1-1bd2f0434b12" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/6271bef9-24f0-4cd8-bfd9-35999a87021b" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/4a347abe-6baa-40da-84ad-47e9b81f3017" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/0e8b5d78-b2e3-441e-9047-216c65683658" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/07fd9bed-e2a5-4933-af2c-caa359652598" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/8abd3fce-7bcc-4c24-9a4a-a4d767846f26" width="auto" height="90">
</p>


## Instalación

### Requisitos
- Node.js = 16.0
- npm = 10.2.0
- CLI = 16.2.14

### Pasos
1. Instala las dependencias:
   ```bash
   $ npm install
   ```
2. Transpila el codigo a JavaScript:
   ```bash
   $ npm run build
   ```
3. Levanta los contenedores:
   ```bash
   $ docker-compose up -d
   ```
4. Ejecuta las migraciones:
   ```bash
   $ npm run migrate
   ```
5. Inicia el servidor de desarrollo:
   ```bash
   $ npm run start
   ```
Nota 1: Para revertir las migraciones realizadas ejecuta:
  ```bash
  $ npm run unmigrate
  ```
Nota 2: Luego de generar el build del backend deberás copiar tu archivo `.env` en la raiz del directorio dist, esto con el fin de que las variables se tomen correctamente al momento de generar las migraciones.
Luego de la ejecución de las migraciones y el inicio del servidor de desarrollo vas a lograr hacer pruebas con un usuario admin que tiene los permisos para consumir todos los servicios. Importa la colección de Postman adjunta en este proyecto y prueba cada uno de los servicios disponibles.

## Apoyo

Para obtener ayuda, puedes utilizar las siguientes vías:

- [GitHub Issues](https://github.com/sebastiannarvaez23/template-base-express/issues)
- [Correo Electrónico](narvaezsebas8@gmail.com)

## Contribuyendo

¡Contribuciones son bienvenidas! Para contribuir:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

### Configuración para Desarrollo

Para configurar el entorno de desarrollo:

1. Instala las dependencias del proyecto.
2. Configura las variables de entorno necesarias.
3. Ejecuta los scripts de inicio y prueba para asegurar la calidad del código.

## Autores y Reconocimientos

Desarrollado por [Sebastian Narvaez](https://github.com/sebastiannarvaez23).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Estado del proyecto

**Estado:** En crecimiento.
