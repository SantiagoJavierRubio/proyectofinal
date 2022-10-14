import "dotenv/config"
import { obtenerProductos,
    crearProducto,
    cambiarInfoDeProducto,
    eliminarProductoPorId
} from '../logica/productos.js'

export const getAll = async (req, res, next) => {
    try {
        const payload = await obtenerProductos(req.params.id)
        return res.status(200).json(payload)
    } catch(err) {
        next(err)
    }
}
export const nuevoProducto = async (req, res, next) => {
    try {
        const addedProduct = await crearProducto(req.body)
        return res.status(200).send(addedProduct)
    } catch(err) {
        next(err)
    }
}
export const editarProducto = async (req, res, next) => {
    try {
        const editedProduct = await cambiarInfoDeProducto(req.params.id, req.body)
        return res.status(200).json(editedProduct)
    } catch(err) {
        next(err)
    }
}
export const eliminarProducto = async (req, res, next) => {
    try {
        const deletedProduct = await eliminarProductoPorId(req.params.id)
        return res.status(200).json(deletedProduct)
    } catch(err) {
        next(err)
    }
}
export const revisarAutorizacion = async (req, res, next) => {
    if(process.env.ADMIN_MODE) {
        return next()
    } else {
        res.status(401).json({
            error: -1,
            description: `ruta '${req.url} método ${req.method} no autorizada`
        })
    }
}
