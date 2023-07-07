import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const AgregarUsuario = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  
  const navegar = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const agregarUsuario = () =>{
    let usuario = {
      id: uniqid(),
      nombre: nombre,
      email: email,
      telefono: telefono
    }
    
    axios.post('/api/usuario/agregarUsuario', usuario)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        })
        navegar('/');
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
        console.log(err);
      });
  }

  return (
    <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-3' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
            <h2>Agregar Usuario</h2>
          </div>
          <div className='row'>
            <div className='col-sm-6 offset-3'  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
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
              <button className='btn btn-success' onClick={agregarUsuario}>Guardar usuario</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AgregarUsuario