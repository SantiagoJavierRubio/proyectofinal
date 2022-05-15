import express from 'express'
import "dotenv/config"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import __yargs from 'yargs'
import passport from 'passport'
import rutasProductos from './rutas/productos.js'
import rutasCarrito from './rutas/carrito.js'
import rutasAuth from './rutas/auth.js'
import checkAuth from './passport/checkAuth.js'
import './passport/localStrategy.js'

// Workaround porque no funcionaba __dirname al trabajar en módulos (creo)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Constantes globales
const yargs = __yargs(process.argv.slice(2))
const args = yargs
    .default('puerto', 8080)
    .default('localDB', false)
    .default('modo', 'fork')
    .argv

const MONGO_URL = args.localDB ? process.env.LOCAL_MONGO_URL : process.env.CLOUD_MONGO_URL

// SERVER SETUP
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*10
    }
}))

// PASSPORT SETUP
app.use(passport.initialize())
app.use(passport.session())

// RUTAS FRONT
app.get('/', checkAuth, (req, res) => {
    res.sendFile('/public/home.html', {root: __dirname})
})
app.get('/admin', (req, res) => {
    res.sendFile('/public/admin.html', {root: __dirname})
})
app.get('/carrito', checkAuth, (req, res) => {
    res.sendFile('/public/carrito.html', {root: __dirname})
})
app.get('/login', (req, res) => {
    res.sendFile('/public/login.html', {root: __dirname})
})
app.get('/register', (req, res) => {
    res.sendFile('/public/register.html', {root: __dirname})
})
app.get('/profile', checkAuth, (req, res) => {
    res.sendFile('/public/profile.html', {root: __dirname})
})
app.use('/auth', rutasAuth)

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
const PORT = process.env.PORT || args.puerto

const startServer = () => {
    mongoose.connect(MONGO_URL, (err) => {
        if(err) return console.log(err)
        console.log(`MongoDB conectado a ${args.localDB ? 'local' : 'cloud atlas'}`)
    })    
    const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
    server.on('error', (err) => {
        console.log(`Server error: ${err}`)
    })
}

if(args.modo === 'cluster') {
    const { default: cluster } = await import('cluster')
    const { default: os } = await import('os')
    if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)
        const cpuCount = os.cpus().length
        for(let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        startServer()
    }
} else {
    startServer()
}