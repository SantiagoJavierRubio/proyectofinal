import productos from '../persistencia/daos/mongo/productos.js'
import "dotenv/config"

export const getAll = async (req, res, next) => {
    try {
        const id = req.params.id
        if(id){
            const product = await productos.findOneById(id)
            return res.status(200).json(product) 
        } else {
            const productList = await productos.getAll()
            return res.status(200).json(productList)
        }
    } catch(err) {
        next(err)
    }
}
export const nuevoProducto = async (req, res, next) => {
    try {
        const userInput = req.body
        const addedProduct = await productos.createNew(userInput)
        return res.status(200).send(addedProduct)
    } catch(err) {
        next(err)
    }
}
export const editarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const userInput = req.body
        const editedProduct = await productos.edit(id, userInput)
        return res.status(200).json(editedProduct)
    } catch(err) {
        next(err)
    }
}
export const eliminarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedProduct = await productos.deleteById(id)
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
