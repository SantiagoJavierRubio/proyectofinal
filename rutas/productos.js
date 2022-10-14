import { Router } from 'express'
import { getAll,
    nuevoProducto,
    editarProducto,
    eliminarProducto } from '../logica/productos.js'

const revisarAutorizacion = (req, res, next) => {
    // Aquí iría la lógica para revisar si el usuario está o no autorizado
    const auth = true
    // -- //
    if(auth) {
        return next()
    } else {
        res.status(401).json({
            error: -1,
            description: `ruta '${req.url} método ${req.method} no autorizada`
        })
    }
}

const router = Router()

router.get('/:id?', getAll)
router.post('/', revisarAutorizacion, nuevoProducto)
router.put('/:id', revisarAutorizacion, editarProducto)
router.delete('/:id', revisarAutorizacion, eliminarProducto)

export default router