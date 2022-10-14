import express from 'express'
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor!')
})


const handleBadRoute = (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta '${req.url}' método '${req.method}' no implementada`
    })
}
app.use(handleBadRoute)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => {
    console.log(`Server error: ${err}`)
})