import productos from '../daos/mongo/productos.js'
import carritos from '../daos/mongo/carrito.js'
import { enviarNuevoPedido } from '../messaging/emails.js'
import { avisarNuevoPedido, enviarSmsAlUsuario } from '../messaging/phoneMessages.js'
import {errorLogger} from '../loggers/logger.js'

export const eliminarCarrito = async (req, res, next) => {
    try{
        const deletedCarrito = await carritos.empty(req.user._id)
        if(deletedCarrito.error) throw new Error(deletedCarrito.error)
        res.sendStatus(200)
    } catch(err) {
        errorLogger.error(err)
        res.status(500).json({ error: err.message })
    }
}
export const obtenerLista = async (req, res, next) => {
    try{
        const listaIds = await carritos.getProducts(req.user._id)
        if(listaIds.error) throw new Error(listaIds.error)
        const listaProductos = await productos.getMany(listaIds)
        if(!listaProductos) return res.sendStatus(500)
        res.status(200).json(listaProductos)
    } catch(err) {
        errorLogger.error(err)
        res.status(500).json({ error: err.message })
    }
}
export const agregarProductos = async (req, res, next) => {
    try{
        const userInput = req.body.productos
        const nuevoCarrito = await carritos.addProducts(req.user._id, userInput)
        if(nuevoCarrito.error) throw new Error(nuevoCarrito.error)
        res.sendStatus(200)
    } catch(err) {
        errorLogger.error(err)
        res.status(500).json({ error: err.message })
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
        errorLogger.error(err)
        res.status(500).json({ error: err.message })
    }
}

export const realizarCompra = async (req, res) => {
    try {
        const listaIds = await carritos.getProducts(req.user._id)
        if(listaIds.error) throw new Error(listaIds.error)
        const listaProductos = await productos.getMany(listaIds)
        if(!listaProductos) return res.sendStatus(500)
        await enviarNuevoPedido({productos: listaProductos, user: req.user})
        const whatsapp = await avisarNuevoPedido({productos: listaProductos, user: req.user})
        if(whatsapp.error) {
            errorLogger.error(`Error al enviar mensaje al administrador: ${whatsapp.error}`)
        }
        const avisoUsuario = await enviarSmsAlUsuario(req.user)
        if(avisoUsuario.error) {
            errorLogger.error(`Error al enviar mensaje al usuario: ${avisoUsuario.error}`)
        }
        const deletedCarrito = await carritos.empty(req.user._id)
        if(deletedCarrito.error) throw new Error(deletedCarrito.error)
        res.sendStatus(200) 
    }
    catch(err) {
        errorLogger.error(err)
        res.status(500).json({ error: err.message })
    }
}