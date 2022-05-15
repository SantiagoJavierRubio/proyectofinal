import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import Model from '../../Database/MongoDB/Models/carrito.js'

class Carrito extends ContenedorMongoDB {
    constructor() { super(Model) }

    async getUniqueOrCreate(user_id) {
        try {
            if(!user_id) throw new Error('Usuario no encontrado')
            const exists = await this.getOne({owner: user_id})
            if(exists) return exists._id
            const carrito = await this.save({ productos: [], owner: user_id })
            return carrito._id
        } catch(err) {
            return { error: err.message }
        }
    }
    async getProducts(user_id) {
        try {
            const id = await this.getUniqueOrCreate(user_id)
            if(id.error) throw new Error(id.error)
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            return carro.productos || []
        } catch(err) {
            return { error: err.message }
        }
    }
    async addProducts(user_id, product_list) {
        try {
            const id = await this.getUniqueOrCreate(user_id)
            if(id.error) throw new Error(id.error)
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = [ ...carro.productos, ...product_list ]
            return await this.update(id, carro)
        } catch(err) {
            return { error: err.message }
        }
    }
    async removeProduct(user_id, product_id) {
        try {
            const id = await this.getUniqueOrCreate(user_id)
            if(id.error) throw new Error(id.error)
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = carro.productos.filter(prod => prod != product_id)
            return await this.update(id, carro)
        } catch(err) {
            return { error: err.message }
        }
    }
    async empty(user_id) {
        try {
            const id = await this.getUniqueOrCreate(user_id)
            if(id.error) throw new Error(id.error)
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = []
            return await this.update(id, carro)
        }
        catch(err) {
            return { error: err.message }
        }
    }
}

const carritos = new Carrito()
export default carritos