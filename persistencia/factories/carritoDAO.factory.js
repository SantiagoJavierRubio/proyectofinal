import "dotenv/config"
import mongoDAO from '../daos/mongo/carrito.js'

let carritoDAO

switch(process.env.DATABASE) {
    default:
        carritoDAO = new mongoDAO()
}

export const getCarritoDAO = () => {
    return carritoDAO
}