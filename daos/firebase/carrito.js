import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class Carrito extends ContenedorFirebase {
    constructor(db) {
        super(db.collection('carrito'))
    }

    async createNew() {
        try {
            const carrito = await this.save({ productos: [] })
            return carrito.id
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

export default Carrito