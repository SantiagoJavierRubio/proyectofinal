import express from 'express'
import "dotenv/config"
import rutasProductos from './rutas/productos.js'
import rutasCarrito from './rutas/carrito.js'

// SERVER SETUP
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// RUTAS BASE
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor!')
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

// START SERVER
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => {
    console.log(`Server error: ${err}`)
})