import productos from '../daos/mongo/productos.js'
import carritos from '../daos/mongo/carrito.js'
import { enviarNuevoPedido } from '../messaging/emails.js'

export const eliminarCarrito = async (req, res, next) => {
    try{
        const deletedCarrito = await carritos.empty(req.user._id)
        if(deletedCarrito.error) throw new Error(deletedCarrito.error)
        if(!deletedCarrito) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const obtenerLista = async (req, res, next) => {
    try{
        const listaIds = await carritos.getProducts(req.user._id)
        if(listaIds.error) throw new Error(listaIds.error)
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
        const userInput = req.body.productos
        const nuevoCarrito = await carritos.addProducts(req.user._id, userInput)
        if(nuevoCarrito.error) throw new Error(nuevoCarrito.error)
        if(!nuevoCarrito) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const quitarProducto = async (req, res, next) => {
    try{
        const id_prod = req.params.id_prod
        const deletedProduct = await carritos.removeProduct(req.user._id, id_prod)
        if(deletedProduct.error) throw new Error(deletedProduct.error)
        if(!deletedProduct) return res.sendStatus(500)
        res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}

export const realizarCompra = async (req, res) => {
    try {
        const listaIds = await carritos.getProducts(req.user._id)
        if(listaIds.error) throw new Error(listaIds.error)
        if(!listaIds) return res.sendStatus(500)
        const listaProductos = await productos.getMany(listaIds)
        if(!listaProductos) return res.sendStatus(500)
        enviarNuevoPedido({productos: listaProductos, user: req.user})
        const deletedCarrito = await carritos.empty(req.user._id)
        if(deletedCarrito.error) throw new Error(deletedCarrito.error)
        if(!deletedCarrito) return res.sendStatus(500)
        res.sendStatus(200) 
    }
    catch(err) {
        console.log(err)
    }
}