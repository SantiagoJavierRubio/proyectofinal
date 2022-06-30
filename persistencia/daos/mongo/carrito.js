import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import Model from '../../Database/MongoDB/Models/carrito.js'
import SendCarritoDTO from '../../DTOs/sendCarrito.dto.js'
import CustomError from '../../../error_handling/customError.js'

export default class Carrito extends ContenedorMongoDB {
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
        await this.update(id, carro)
        return new SendCarritoDTO(carro)
    }
    async removeProduct(user_id, product_id) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if(!carro) throw new CustomError(404, 'Carro no encontrado')
        carro.productos = carro.productos.filter(prod => prod != product_id)
        await this.update(id, carro)
        return new SendCarritoDTO(carro)
    }
    async empty(user_id) {
        const id = await this.getUniqueOrCreate(user_id)
        const carro = await this.getById(id)
        if (!carro) throw new CustomError(404, 'Carro no encontrado')
        if (carro.productos.length < 1) throw new CustomError(400, 'El carro ya está vacío')
        carro.productos = []
        await this.update(id, carro)
        return new SendCarritoDTO(carro)
    }
}