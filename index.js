import express from 'express'
import "dotenv/config"
import rutasProductos from './rutas/productos.js'
import rutasCarrito from './rutas/carrito.js'
// Workaround porque no funcionaba __dirname al trabajar en módulos (creo)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// SERVER SETUP
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// RUTAS FRONT
app.get('/', (req, res) => {
    res.sendFile('index.html')
})
app.get('/admin', (req, res) => {
    res.sendFile('/public/admin.html', {root: __dirname})
})
app.get('/carrito', (req, res) => {
    res.sendFile('/public/carrito.html', {root: __dirname})
})

// RUTAS API
app.use('/api/productos', rutasProductos)
app.use('/api/carrito', rutasCarrito)

// HANDLE 404
const handleBadRoute = (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta '${req.url}' método '${req.method}' no implementada`
    })
}
app.use(handleBadRoute)

// CONNECT DATABASE
if(process.env.DATA_ACCESS_TYPE == 'MONGODB'){
    const { default: mongoose } = await import('mongoose')
    mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('connected?')
}

// START SERVER
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => {
    console.log(`Server error: ${err}`)
})