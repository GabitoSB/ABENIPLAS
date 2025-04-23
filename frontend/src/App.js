import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BolsaList from './BolsaList';
import BolsaForm from './BolsaForm';

function App() {
  const [recargar, setRecargar] = useState(false);

  const recargarDatos = () => setRecargar(!recargar);

  return (
    <div className="App">
      <h1 className="text-center mt-4">Inventario de Bolsas – ABENIPLAS</h1>
      <BolsaForm onRegistroExitoso={recargarDatos} />
      <BolsaList key={recargar} />
    </div>
  );
}

export default App;
