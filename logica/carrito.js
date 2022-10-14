import carritos from '../persist/carrito.js'
import productos from '../persist/productos.js'

export const crearCarrito = async (req, res, next) => {
    try{
        const nuevoCarrito = await carritos.createNew()
        if(!nuevoCarrito) return res.sendStatus(500)
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
        const listaProductos = await carritos.getProducts(id)
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
        const productList = await productos.getManyById(userInput)
        const nuevoCarrito = await carritos.addProducts(id, productList)
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