const express = require('express');
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaUsuario = new eschema ({
    id: String,
    nombre: String,
    email: String,
    telefono: String

})

const modeloUsuario = mongoose.model('usuarios', eschemaUsuario)
module.exports = router

// ruta de prueba
router.get('/ejemplo', (req, res) => res.end('Si sirve'))


// ruta para agregar usuario
router.post('/agregarUsuario', async (req, res) => {
    try {
      const nuevoUsuario = new modeloUsuario({
        id: req.body.id,
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono
      });
  
      await nuevoUsuario.save();
      res.send('Usuario agregado correctamente');
    } catch (error) {
      res.send(error);
    }
  });
  

// ruta para obtener todos los usuarios
router.get('/obtenerUsuarios', async (req, res) => {
    modeloUsuario.find({})
  .then((usuarios) => {
    res.send(usuarios);
  })
  .catch((err) => {
    res.send(err);
  });

});

// ruta para obtener los datos de un usuario
router.post('/obtenerDataUsuario', async (req, res) => {
  modeloUsuario.find({id:req.body.id})
.then((usuario) => {
  res.send(usuario);
})
.catch((err) => {
  res.send(err);
});

});

// actualizar usuario
router.post('/actualizarUsuario', (req, res) => {
  modeloUsuario
    .findOneAndUpdate({ id: req.body.id }, {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
    })
    .then(() => {
      res.send('Usuario actualizado exitosamente');
    })
    .catch(err => {
      res.send(err);
    });
});

router.delete('/borrarUsuario', (req, res) => {
  modeloUsuario
    .findOneAndDelete({ id: req.query.id })
    .then(() => {
      res.send('Usuario eliminado exitosamente');
    })
    .catch(err => {
      res.send(err);
    });
});
