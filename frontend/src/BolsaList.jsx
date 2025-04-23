import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BolsaList() {
  const [bolsas, setBolsas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarBolsas = () => {
    axios.get('http://192.168.1.111:3001/prepicado')
      .then(res => setBolsas(res.data))
      .catch(err => console.error('Error al obtener bolsas:', err));
  };

  useEffect(() => {
    cargarBolsas();
  }, []);

  const handleEditClick = (bolsa) => setEditando({ ...bolsa });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditando(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.111:3001/prepicado/${editando.id}`, {
        medida: editando.medida,
        cantidad: parseInt(editando.cantidad),
        codigo_barras: editando.codigo_barras
      });
      setEditando(null);
      cargarBolsas();
    } catch (err) {
      console.error('Error al actualizar bolsa:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta bolsa?')) {
      try {
        await axios.delete(`http://192.168.1.111:3001/prepicado/${id}`);
        cargarBolsas();
      } catch (err) {
        console.error('Error al eliminar bolsa:', err);
      }
    }
  };

  // 🧠 Aplicar filtro en tiempo real
  const bolsasFiltradas = bolsas.filter(b =>
    b.medida.toLowerCase().includes(busqueda.toLowerCase()) ||
    b.codigo_barras.includes(busqueda)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Bolsas registradas</h2>

      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por medida o código de barras"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Medida</th>
            <th>Cantidad</th>
            <th>Código de Barras</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bolsasFiltradas.map(bolsa => (
            <tr key={bolsa.id}>
              <td>{bolsa.id}</td>
              <td>{bolsa.medida}</td>
              <td>{bolsa.cantidad}</td>
              <td>{bolsa.codigo_barras}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(bolsa)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(bolsa.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✏️ Formulario de edición */}
      {editando && (
        <div className="mt-5">
          <h4>Editar bolsa ID #{editando.id}</h4>
          <form onSubmit={handleUpdate} className="row g-3">
            <div className="col-md-4">
              <input type="text" className="form-control" name="medida" value={editando.medida} onChange={handleEditChange} required />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" name="cantidad" value={editando.cantidad} onChange={handleEditChange} required />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" name="codigo_barras" value={editando.codigo_barras} onChange={handleEditChange} required />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditando(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BolsaList;
