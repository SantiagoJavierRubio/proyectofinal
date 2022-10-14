import productos from '../daos/mongo/productos.js'
import carritos from '../daos/mongo/carrito.js'

export const checkExists = async (req, res, next) => {
    try {
        const id = req.params.id
        const exists = await carritos.checkExists(id)
        if(!exists) {
            res.sendStatus(404)
            return res.end() 
        } else {
            return next()
        }
    } catch(err) {
        console.log(err)
    }
}
export const crearCarrito = async (req, res, next) => {
    try{
        const nuevoCarrito = await carritos.createNew()
        if(nuevoCarrito == null) return res.sendStatus(500)
        res.status(200).json({ id: nuevoCarrito })
    } catch(err) {
        console.error(err)
    }
}
export const eliminarCarrito = async (req, res, next) => {
    try{
        const id = req.params.id
        const deletedCarrito = await carritos.deleteById(id)
        if(!deletedCarrito) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const obtenerLista = async (req, res, next) => {
    try{
        const id = req.params.id
        const listaIds = await carritos.getProducts(id)
        if(!listaIds) return res.sendStatus(500)
        const listaProductos = await productos.getMany(listaIds)
        if(!listaProductos) return res.sendStatus(500)
        res.status(200).json(listaProductos)
    } catch(err) {
        console.error(err)
    }
}
export const agregarProductos = async (req, res, next) => {
    try{
        const id = req.params.id
        const userInput = req.body.productos
        const nuevoCarrito = await carritos.addProducts(id, userInput)
        if(!nuevoCarrito) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const quitarProducto = async (req, res, next) => {
    try{
        const id = req.params.id
        const id_prod = req.params.id_prod
        const deletedProduct = await carritos.removeProduct(id, id_prod)
        if(!deletedProduct) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}