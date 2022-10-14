import productos from '../persistencia/daos/mongo/productos.js'
import carritos from '../persistencia/daos/mongo/carrito.js'
import { enviarNuevoPedido } from '../messaging/emails.js'
import { avisarNuevoPedido, enviarSmsAlUsuario } from '../messaging/phoneMessages.js'

export const eliminarCarrito = async (req, res, next) => {
    try{
        const deletedCarrito = await carritos.empty(req.user._id)
        res.status(200).json({ message: 'Carrito eliminado correctamente' })
    } catch(err) {
        next(err)
    }
}
export const obtenerLista = async (req, res, next) => {
    try{
        const listaIds = await carritos.getProducts(req.user._id)
        const listaProductos = await productos.getMany(listaIds)
        if(!listaProductos) return res.sendStatus(500)
        res.status(200).json(listaProductos)
    } catch(err) {
        next(err)
    }
}
export const agregarProductos = async (req, res, next) => {
    try{
        const userInput = req.body.productos
        const nuevoCarrito = await carritos.addProducts(req.user._id, userInput)
        res.status(200).json(nuevoCarrito)
    } catch(err) {
        next(err)
    }
}
export const quitarProducto = async (req, res, next) => {
    try{
        const id_prod = req.params.id_prod
        const deletedProduct = await carritos.removeProduct(req.user._id, id_prod)
        res.status(200).json(deletedProduct)
    } catch(err) {
        next(err)
    }
}

export const realizarCompra = async (req, res) => {
    try {
        const listaIds = await carritos.getProducts(req.user._id)
        const listaProductos = await productos.getMany(listaIds)
        await enviarNuevoPedido({productos: listaProductos, user: req.user})
        await avisarNuevoPedido({productos: listaProductos, user: req.user})
        await enviarSmsAlUsuario(req.user)
        await carritos.empty(req.user._id)
        res.status(200).json({ message: 'Compra realizada con éxito' })
    }
    catch(err) {
        next(err)
    }
}