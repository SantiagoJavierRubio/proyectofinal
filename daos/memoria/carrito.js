import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js"

class Carrito extends ContenedorMemoria {
    constructor() { super() }

    async createNew() {
        try {
            const carrito = this.save({
                id: this.getNewId(),
                timestamp: Date.now(),
                productos: []
            })
            return carrito.id
        } catch(err) {
            return new Error(`Error al crear el carrito: ${err}`)
        }

    }

    async checkExists(id) {
        try {
            const carro = this.getById(id)
            return carro ? true : false
        } catch(err) {
            return new Error(`Error al obtener el carrito: ${err}`)
        }
    }

    async getProducts(id) {
        try {
            const carro = this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            return carro.productos || []
        } catch(err) {
            return new Error(`Error al obtener los productos: ${err}`)
        }
    }

    async addProducts(id, product_list) {
        try {
            const carro = this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = [ ...carro.productos, ...product_list ]
            return this.update(id, carro)
        } catch(err) {
            return new Error(`Error al añadir los productos: ${err}`)
        }
    }

    async removeProduct(id, product_id) {
        try {
            const carro = this.getById(id)
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = carro.productos.filter(prod => prod.id != product_id)
            return this.update(id, carro)
        } catch(err) {
            return new Error(`Error al quitar los productos: ${err}`)
        }
    }
}

export default Carrito