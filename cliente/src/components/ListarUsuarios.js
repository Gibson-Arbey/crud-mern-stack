import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuscarUsuario from './BuscarUsuario';

const ListarUsuarios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/usuario/obtenerUsuarios')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const listaUsuarios = data.map(usuario => (
    <BuscarUsuario key={usuario.id} usuario={usuario} />
  ));

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {listaUsuarios}
    </div>
  );
};

export default ListarUsuarios;
