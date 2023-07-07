import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const BuscarUsuario = ({ usuario }) => {
  const navegar = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const borrarUsuario = (id) => {
    axios
      .delete(`/api/usuario/borrarUsuario?id=${id}`)
      .then((res) => {
        //console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        }).then(() => navegar(0));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
        console.log(err);}
      );
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-sm-6 offset-3"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1500"
        >
          <ul className="list-group">
            <li className="list-group-item">{usuario.id}</li>
            <li className="list-group-item">{usuario.nombre}</li>
            <li className="list-group-item">{usuario.email}</li>
            <li className="list-group-item">{usuario.telefono}</li>
          </ul>
          <Link to={`/editarUsuario/${usuario.id}`} className="btn btn-success">
            Editar
          </Link>
          &nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              borrarUsuario(usuario.id);
            }}
          >
            Eliminar
          </button>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuario;
