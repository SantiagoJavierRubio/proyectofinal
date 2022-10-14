import "dotenv/config"
import mongoDAO from '../daos/mongo/productos.js'

let productosDAO

switch(process.env.DATABASE) {
    default:
        productosDAO = new mongoDAO()
}

export const getProductosDAO = () => {
    return productosDAO
}