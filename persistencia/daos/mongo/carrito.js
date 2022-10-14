import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import Model from '../../Database/MongoDB/Models/carrito.js'
import CustomError from '../../../error_handling/customError.js'

class Carrito extends ContenedorMongoDB {
    constructor() { super(Model) }

    async getUniqueOrCreate(user_id) {
        if(!user_id) throw new CustomError(404, 'Usuario no encontrado')
        const exists = await this.getOne({owner: user_id})
        if(exists) return exists._id
        const carrito = await this.save({ productos: [], owner: user_id })
        return carrito._id
    }
    async getProducts(user_id) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if(!carro) throw new CustomError(404, 'Carro no encontrado')
        return carro.productos || []
    }
    async addProducts(user_id, product_list) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if(!carro) throw new CustomError(404, 'Carro no encontrado')
        carro.productos = [ ...carro.productos, ...product_list ]
        return await this.update(id, carro)
    }
    async removeProduct(user_id, product_id) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if(!carro) throw new CustomError(404, 'Carro no encontrado')
        carro.productos = carro.productos.filter(prod => prod != product_id)
        return await this.update(id, carro)
    }
    async empty(user_id) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if(!carro) throw new CustomError(404, 'Carro no encontrado')
        carro.productos = []
        return await this.update(id, carro)
    }
}

const carritos = new Carrito()
export default carritos