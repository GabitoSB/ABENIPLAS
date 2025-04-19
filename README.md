# 🧾 ABENIPLAS – Sistema de Inventario de Prepicado

Proyecto desarrollado en Node.js + SQL Server para la gestión de bolsas de prepicado en la empresa ABENIPLAS.

Permite realizar operaciones **CRUD** completas (crear, leer, actualizar y eliminar bolsas) conectadas a una base de datos SQL Server contenida en Docker.

---

## ⚙️ Tecnologías utilizadas

- Node.js (Express)
- SQL Server (en Docker)
- Docker Compose
- Postman para pruebas de API

---

## 🧑‍🤝‍🧑 Clonar y ejecutar el proyecto (pasos para tu compa)

### 1. Clonar el repositorio

git clone https://github.com/GabitoSB/ABENIPLAS.git
cd ABENIPLAS

### 2. Levantar SQL Server con Docker

docker compose up -d

### 3. Crear la base de datos (una sola vez)

Abrir database/01_init.sql en SSMS (SQL Server Management Studio)
Conectarse a localhost con:

        Usuario: sa
        Contraseña: YourStrong@Passw0rd

Ejecutar el script completo disponible en ABENIPLAS/database/01_init.sql para crear la base y la tabla prepicado.

### Crear archivo .env en la raíz del proyecto (ABENIPLAS/.env) con el siguiente contenido:

DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASS=YourStrong@Passw0rd
DB_NAME=abeniplas

### Ejecutar el backend

cd backend
npm install
node index.js

