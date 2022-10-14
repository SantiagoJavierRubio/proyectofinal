import { Router } from 'express'
import { crearCarrito,
    eliminarCarrito,
    obtenerLista,
    agregarProductos,
    quitarProducto } from '../logica/carrito.js'

const router = Router()

router.post('/', crearCarrito)
router.delete('/:id', eliminarCarrito)
router.get('/:id/productos', obtenerLista)
router.post('/:id/productos', agregarProductos)
router.delete('/:id/productos/:id_prod', quitarProducto)

export default router