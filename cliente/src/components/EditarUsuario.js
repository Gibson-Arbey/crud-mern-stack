import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const EditarUsuario = () => {

  const params = useParams();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const navegar = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    axios.post('/api/usuario/obtenerDataUsuario', {id:params.id})
      .then(res => {
        console.log(res.data[0])
        const dataUsuario = res.data[0];
        setNombre(dataUsuario.nombre);
        setEmail(dataUsuario.email);
        setTelefono(dataUsuario.telefono);
      })
      .catch(err => console.log(err));
  }, [params.id])

  const editarUsuario = () => {
    const usuarioActualizado = {
      id: params.id,
      nombre: nombre,
      email: email,
      telefono: telefono
    }
    console.log(usuarioActualizado);
    axios.post('/api/usuario/actualizarUsuario', usuarioActualizado)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        })
        navegar('/');
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      });


  }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-sm-6 offset-3' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
        <h2>Editar Usuario</h2>
      </div>
      <div className='row'>
        <div className='col-sm-6 offset-3' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
          <div className='mb-3'>
            <label htmlFor='nombre' className='form-label'>Nombre de usuario</label>
            <input className='form-control' type='text' value={nombre} onChange={e => setNombre(e.target.value)}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email del usuario</label>
            <input className='form-control' type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='telefono' className='form-label'>telefono del usuario</label>
            <input className='form-control' type='text' value={telefono} onChange={e => setTelefono(e.target.value)}></input>
          </div>
          <button className='btn btn-success' onClick={editarUsuario}>Actualizar usuario</button>
        </div>
      </div>
    </div>
</div>
  )
}

export default EditarUsuario