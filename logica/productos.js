import { getProductosDAO } from '../persistencia/factories/productosDAOFactory.js'
import "dotenv/config"

const productos = getProductosDAO()

export const obtenerProductos = async (id) => {
    return id ? await productos.findOneById(id) : await productos.getAll()
}

export const crearProducto = async (productData) => {
    return await productos.createNew(productData)
}

export const cambiarInfoDeProducto = async (id, data) => {
    return await productos.edit(id, data)
}

export const eliminarProductoPorId = async (id) => {
    return await productos.deleteById(id)
}
