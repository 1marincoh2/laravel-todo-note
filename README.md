# API Documentation

Este documento detalla las rutas disponibles de la API de notas, los métodos HTTP correspondientes y ejemplos de cómo probar cada endpoint utilizando **Postman**. 

Asegúrate de que tu servidor Laravel esté ejecutándose (puedes usar `php artisan serve` si estás en desarrollo local).


## Requisitos

Para ejecutar este proyecto, asegúrate de que tu entorno cumpla con los siguientes requisitos:

- **PHP:** Versión mínima 8.1
- **Laravel:** Versión 10
- **Composer:** Instalado globalmente para gestionar dependencias de PHP.
- **Node.js:** Versión mínima 20 (necesario para el frontend o cualquier tarea que utilice Node.js en el proyecto).
- **NPM (Node Package Manager):** Instalado con Node.js para gestionar dependencias JavaScript.

## Instalación

### 1. Clonar el repositorio

Si aún no tienes el repositorio clonado, hazlo con el siguiente comando:

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto
```

# API Documentation

Este documento detalla las rutas disponibles de la API de notas, los métodos HTTP correspondientes y ejemplos de cómo probar cada endpoint utilizando **Postman**.

## Requisitos

Para ejecutar este proyecto, asegúrate de que tu entorno cumpla con los siguientes requisitos:

- **PHP:** Versión mínima 8.1
- **Laravel:** Versión 10
- **Composer:** Instalado globalmente para gestionar dependencias de PHP.
- **Node.js:** Versión mínima 20 (necesario para el frontend o cualquier tarea que utilice Node.js en el proyecto).
- **NPM (Node Package Manager):** Instalado con Node.js para gestionar dependencias JavaScript.

## Instalación

### 1. Clonar el repositorio

Si aún no tienes el repositorio clonado, hazlo con el siguiente comando:

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto
```

### 2. Instalar dependencias de PHP con Composer

Ejecuta el siguiente comando para instalar todas las dependencias de PHP que Laravel necesita:

```bash
composer install

```
### 3. Instalar dependencias de Node.js
Si tu proyecto incluye alguna funcionalidad de frontend o scripts JavaScript, instala las dependencias de Node.js utilizando npm:

```bash
npm install

```
### 4. Configurar el archivo .env
Copia el archivo .env.example a .env y actualiza la configuración del entorno, como la base de datos y otras variables necesarias.

```bash
cp .env.example .

```
---

## Endpoints

### 1. Registro de usuario

- **Método:** `POST`
- **URL:** `/api/register`
- **Headers:** 
  - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
    ```

### 2. Inicio de sesión

- **Método:** `POST`
- **URL:** `/api/login`
- **Headers:** 
  - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "email": "testuser@example.com",
        "password": "password123"
    }
    ```

  Al iniciar sesión, recibirás un token que debes utilizar en las siguientes solicitudes.

### 3. Obtener información del usuario autenticado

- **Método:** `GET`
- **URL:** `/api/user`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`

### 4. Crear una nota

- **Método:** `POST`
- **URL:** `/api/notes`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`
  - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "title": "Mi primera nota",
        "description": "Esta es una nota de prueba",
        "due_date": "2023-12-31"
    }
    ```

### 5. Obtener todas las notas

- **Método:** `GET`
- **URL:** `/api/notes`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`

### 6. Obtener una nota específica

- **Método:** `GET`
- **URL:** `/api/notes/{id_de_la_nota}`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`

### 7. Actualizar una nota

- **Método:** `PUT`
- **URL:** `/api/notes/{id_de_la_nota}`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`
  - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "title": "Nota actualizada",
        "description": "Esta nota ha sido actualizada",
        "due_date": "2024-01-15"
    }
    ```

### 8. Eliminar una nota

- **Método:** `DELETE`
- **URL:** `/api/notes/{id_de_la_nota}`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`

### 9. Crear una etiqueta

- **Método:** `POST`
- **URL:** `/api/tags`
- **Headers:**
  - `Authorization: Bearer {tu_token_aquí}`
  - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "name": "Trabajo"
    }
    ```

---

## Comando de Gestión de Notas

Este es un ejemplo de cómo utilizar el comando de consola en Laravel para gestionar notas. El comando permite crear, actualizar, listar y eliminar notas desde la línea de comandos.

### Comando `notes:manage`

Este comando sigue el siguiente formato:

```bash
php artisan notes:manage {action} {--user=} {--note=} {--title=} {--description=} {--due_date=} {--order_by=} {--direction=}

php artisan notes:manage update --note=1 --title="Nota actualizada" --due_date="2024-02-01"
php artisan notes:manage list --order_by=due_date --direction=asc
php artisan notes:manage delete --note=1

   ```
---


### Instrucciones:

- Guarda el contenido anterior en un archivo llamado `README.md` en la raíz de tu proyecto.
- Las rutas de la API están configuradas con la URL base `/api`, lo que significa que debes asegurarte de que el servidor esté en ejecución (`php artisan serve`) en el puerto correcto (ej. `localhost:8000`).
- Los ejemplos de ejecución del comando de Laravel te permiten gestionar notas fácilmente desde la línea de comandos.

Este `README.md` contiene todos los detalles sobre las rutas de API y los ejemplos de ejecución del comando para la gestión de notas en Laravel.

