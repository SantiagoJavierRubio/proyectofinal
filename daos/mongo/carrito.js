import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import Model from '../../Database/MongoDB/Models/carrito.js'

class Carrito extends ContenedorMongoDB {
    constructor() { super(Model) }

    async createNew() {
        try {
            const carrito = await this.save({ productos: [] })
            return carrito._id
        } catch(err) {
            return new Error(`Error al crear el carrito: ${err}`)
        }

    }

    async checkExists(id) {
        try {
            const carro = await this.getById(id)
            return carro ? true : false
        } catch(err) {
            return new Error(`Error al obtener el carrito: ${err}`)
        }
    }

    async getProducts(id) {
        try {
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            return carro.productos || []
        } catch(err) {
            return new Error(`Error al obtener los productos: ${err}`)
        }
    }

    async addProducts(id, product_list) {
        try {
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = [ ...carro.productos, ...product_list ]
            return await this.update(id, carro)
        } catch(err) {
            return new Error(`Error al añadir los productos: ${err}`)
        }
    }

    async removeProduct(id, product_id) {
        try {
            const carro = await this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = carro.productos.filter(prod => prod != product_id)
            return await this.update(id, carro)
        } catch(err) {
            return new Error(`Error al quitar los productos: ${err}`)
        }
    }
}

const carritos = new Carrito()
export default carritos