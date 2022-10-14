import { Router } from 'express'
import passport from 'passport'
import { crearCarrito,
    eliminarCarrito,
    obtenerLista,
    agregarProductos,
    quitarProducto,
    checkExists } from '../logica/carrito.js'

const router = Router()

router.use(passport.authenticate('local', {failureRedirect: '/login'}))
router.post('/', crearCarrito)
router.delete('/:id', checkExists, eliminarCarrito)
router.get('/:id/productos', checkExists, obtenerLista)
router.post('/:id/productos', checkExists, agregarProductos)
router.delete('/:id/productos/:id_prod', checkExists, quitarProducto)

export default router