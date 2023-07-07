const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crud-mern');

const objetoBd = mongoose.connection;

objetoBd.on('connected', ()=> console.log('Conexion correcta a MongoDB'));

objetoBd.on('error', ()=> console.log('Error en la conexion a MongoDB'));

module.exports = mongoose;