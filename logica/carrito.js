import { getProductosDAO } from '../persistencia/factories/productosDAOFactory.js'
import { getCarritoDAO } from '../persistencia/factories/carritoDAOFactory.js'
import { enviarNuevoPedido } from '../messaging/emails.js'
import { avisarNuevoPedido, enviarSmsAlUsuario } from '../messaging/phoneMessages.js'

const productos = getProductosDAO()
const carritos = getCarritoDAO()

export const eliminarProductosDelCarrito = async (userId) => {
    const deletedCarrito = await carritos.empty(req.user._id)
    return deletedCarrito ? true : false
}

export const listarProductosDelCarrito = async (userId) => {
    const listaIds = await carritos.getProducts(userId)
    return await productos.getMany(listaIds)
}

export const agregarProductosYDevolverCarrito = async (userId, productos) => {
    return await carritos.addProducts(userId, productos)
}
export const quitarProductoDelCarrito = async (userId, productId) => {
    return await carritos.removeProduct(userId, productId)
}

export const realizarCompraYVaciarCarrito = async (user) => {
    const listaIds = await carritos.getProducts(user._id)
    const listaProductos = await productos.getMany(listaIds)
    await enviarNuevoPedido({productos: listaProductos, user: user})
    await avisarNuevoPedido({productos: listaProductos, user: user})
    await enviarSmsAlUsuario(user)
    return await carritos.empty(user._id)
}