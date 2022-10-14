import { Router } from 'express'
import { getAll,
    nuevoProducto,
    editarProducto,
    eliminarProducto,
    revisarAutorizacion } from '../logica/productos.js'

const router = Router()

router.get('/:id?', getAll)
router.post('/', revisarAutorizacion, nuevoProducto)
router.put('/:id', revisarAutorizacion, editarProducto)
router.delete('/:id', revisarAutorizacion, eliminarProducto)

export default router