import { Router } from 'express'

const router = Router()

router.post('/', crearCarrito)
router.delete('/:id', eliminarCarrito)
router.get('/:id/productos', obtenerLista)
router.post('/:id/productos', agregarProductos)
router.delete('/:id/productos/:id_producto', quitarProducto)

export default router