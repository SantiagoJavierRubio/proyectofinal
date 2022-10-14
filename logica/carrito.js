import { getProductosDAO } from '../persistencia/factories/productosDAO.factory.js'
import { getCarritoDAO } from '../persistencia/factories/carritoDAO.factory.js'
import { enviarNuevoPedido } from '../messaging/emails.js'
import { avisarNuevoPedido, enviarSmsAlUsuario } from '../messaging/phoneMessages.js'
import CustomError from '../error_handling/customError.js'

const productos = getProductosDAO()
const carritos = getCarritoDAO()

export const eliminarProductosDelCarrito = async (userId) => {
    const deletedCarrito = await carritos.empty(userId)
    return deletedCarrito ? true : false
}

export const listarProductosDelCarrito = async (userId) => {
    const listaIds = await carritos.getProducts(userId)
    return await productos.getListByIds(listaIds)
}

export const agregarProductosYDevolverCarrito = async (userId, productos) => {
    return await carritos.addProducts(userId, productos)
}
export const quitarProductoDelCarrito = async (userId, productId) => {
    return await carritos.removeProduct(userId, productId)
}

export const realizarCompraYVaciarCarrito = async (user) => {
    const listaIds = await carritos.getProducts(user._id)
    if (listaIds.length < 1) throw new CustomError(400, 'Carrito vacío')
    const listaProductos = await productos.getListByIds(listaIds)
    await enviarNuevoPedido({productos: listaProductos, user: user})
    await avisarNuevoPedido({productos: listaProductos, user: user})
    await enviarSmsAlUsuario(user)
    return await carritos.empty(user._id)
}