const express = require('express')
const app = express()

//Importar conexión mongoDB
const archivoBD = require('./conexion')

//Importación del archivo de rutas y modelo usuario
const rutausuario = require('./rutas/usuario')

//Importar body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/usuario', rutausuario)

app.get('/', (req, res) => {
    res.end('Bienvenidos al servidor backend Node.js. Corriendo...')
})



//Configurar server básico
app.listen(5000, function(){
    console.log('El servidor NODE está corriendo correctamente')
})