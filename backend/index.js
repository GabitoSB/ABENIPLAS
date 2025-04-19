// backend/index.js
const express = require('express');
const cors = require('cors');
const { sql, pool, poolConnect } = require('./db');
require('dotenv').config({ path: '../.env' });


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Ruta GET para obtener todos los registros de prepicado
app.get('/prepicado', async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query('SELECT * FROM prepicado');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener prepicado:', err);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});


// Ruta POST para insertar bolsa
app.post('/prepicado', async (req, res) => {
  console.log('BODY RECIBIDO:', req.body);
  const { medida, cantidad, codigo_barras } = req.body;

  if (!medida || !codigo_barras) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    await poolConnect;
    await pool.request()
      .input('medida', sql.NVarChar, medida)
      .input('cantidad', sql.Int, cantidad ?? 0)
      .input('codigo_barras', sql.NVarChar, codigo_barras)
      .query(`INSERT INTO prepicado (medida, cantidad, codigo_barras) VALUES (@medida, @cantidad, @codigo_barras)`);

    res.status(201).json({ message: 'Bolsa registrada correctamente' });
  } catch (err) {
    console.error('Error al insertar:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Ruta PUT para actualizar una bolsa de prepicado por ID
app.put('/prepicado/:id', async (req, res) => {
    const { id } = req.params;
    const { medida, cantidad, codigo_barras } = req.body;
  
    if (!medida || !codigo_barras || cantidad === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: medida, cantidad y código de barras' });
    }
  
    try {
      await poolConnect;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('medida', sql.NVarChar, medida)
        .input('cantidad', sql.Int, cantidad)
        .input('codigo_barras', sql.NVarChar, codigo_barras)
        .query(`
          UPDATE prepicado
          SET medida = @medida,
              cantidad = @cantidad,
              codigo_barras = @codigo_barras
          WHERE id = @id
        `);
  
      res.json({ message: 'Bolsa actualizada correctamente' });
    } catch (err) {
      console.error('Error al actualizar prepicado:', err);
      res.status(500).json({ error: 'Error interno al actualizar' });
    }
  });
  

// Ruta DELETE para eliminar una bolsa de prepicado por ID
app.delete('/prepicado/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await poolConnect;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`DELETE FROM prepicado WHERE id = @id`);
  
      // Verifica si realmente se eliminó algo
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Bolsa no encontrada' });
      }
  
      res.json({ message: 'Bolsa eliminada correctamente' });
    } catch (err) {
      console.error('Error al eliminar prepicado:', err);
      res.status(500).json({ error: 'Error interno al eliminar' });
    }
  });
  