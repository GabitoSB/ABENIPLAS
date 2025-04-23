// frontend/src/BolsaForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function BolsaForm({ onRegistroExitoso }) {
  const [formData, setFormData] = useState({
    medida: '',
    cantidad: '',
    codigo_barras: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.111:3001/prepicado', {
        ...formData,
        cantidad: parseInt(formData.cantidad) || 0
      });
      onRegistroExitoso(); // Llama al padre para recargar la tabla
      setFormData({ medida: '', cantidad: '', codigo_barras: '' }); // Limpia el form
    } catch (err) {
      console.error('Error al agregar bolsa:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Agregar nueva bolsa</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <input type="text" className="form-control" name="medida"
            placeholder="Medida (ej: 30x40)" value={formData.medida} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input type="number" className="form-control" name="cantidad"
            placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" name="codigo_barras"
            placeholder="Código de barras" value={formData.codigo_barras} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Agregar</button>
        </div>
      </form>
    </div>
  );
}

export default BolsaForm;
