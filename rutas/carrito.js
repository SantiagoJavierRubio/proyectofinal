import { Router } from 'express'
import { crearCarrito,
    eliminarCarrito,
    obtenerLista,
    agregarProductos,
    quitarProducto,
    checkExists } from '../logica/carrito.js'

const router = Router()

router.post('/', crearCarrito)
router.delete('/:id', checkExists, eliminarCarrito)
router.get('/:id/productos', checkExists, obtenerLista)
router.post('/:id/productos', checkExists, agregarProductos)
router.delete('/:id/productos/:id_prod', checkExists, quitarProducto)

export default router