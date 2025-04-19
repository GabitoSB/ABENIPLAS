CREATE DATABASE abeniplas;
GO

USE abeniplas;
GO

CREATE TABLE prepicado (
    id INT IDENTITY(1,1) PRIMARY KEY,
    medida NVARCHAR(100) NOT NULL,
    cantidad INT DEFAULT 0,
    codigo_barras NVARCHAR(50) UNIQUE
);
GO

-- Insertar datos de prueba opcionales
INSERT INTO prepicado (medida, cantidad, codigo_barras)
VALUES
('30x40 cm', 100, '1234567890123'),
('40x50 cm', 200, '9876543210987');
GO
