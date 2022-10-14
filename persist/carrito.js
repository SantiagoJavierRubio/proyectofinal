import fs from 'fs'

class Carrito {
    constructor() {
        this.timestamp = Date.now()
        this.productos = []
    }
    async getNewId() {
        try {
            if(fs.existsSync(this.filePath)){
                const fileRead = await fs.promises.readFile(this.filePath)
                const fileData = JSON.parse(fileRead)
                let newID = 0
                for(let carrito of fileData) {
                    if(carrito.id >= newID){
                        newID = carrito.id+1
                    }
                }
                return newID
            } else {
               return 0
            }
        } catch(err) {
            console.error(err)
            return null
        }
    }
    filePath = './persist/DB/carrito.json'

    async save() {
        const cartData = {
            id: await this.getNewId(),
            timestamp: this.timestamp,
            productos: this.productos
        }
        try {
            if(fs.existsSync(this.filePath)){
                const fileRead = await fs.promises.readFile(this.filePath)
                const fileData = JSON.parse(fileRead)
                const newList = [ ...fileData, cartData ]
                await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            } else {
                await fs.promises.writeFile(this.filePath, JSON.stringify([cartData]))
            }
            return this.id
        } catch(err) {
            console.error(err)
            return null
        }
    }
}

class Carritos {
    filePath = './persist/DB/carrito.json'

    async createNew() {
        try {
            const cart = new Carrito()
            return await cart.save()
        } catch(err) {
            console.error(err)
            return false
        }
    }
    async getProducts(id) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const carro = fileData.filter(cart => cart.id == id)[0]
            if(!carro) throw new Error('Carro no encontrado')
            return carro.productos || []
        } catch(err) {
            console.error(err)
            return null
        }
    }
    async addProducts(id, product_list) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const carro = fileData.filter(cart => cart.id == id)[0]
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = [ ...carro.productos, ...product_list ]
            const newList = [ ...fileData.filter(cart => cart.id != id), carro ]
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            return true
        } catch(err) {
            console.error(err)
            return null
        }
    }
    async deleteById(id) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const newList = fileData.filter(file => file.id != id)
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            return true
        } catch(err) {
            console.error(err)
            return false
        }
    }
    async removeProduct(id, product_id) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const carro = fileData.filter(cart => cart.id == id)[0]
            if(!carro) throw new Error('Carro no encontrado')
            carro.productos = carro.productos.filter(prod => prod.id != product_id)
            const newList = [ ...fileData.filter(cart => cart.id != id), carro ]
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            return true
        } catch(err) {
            console.error(err)
            return null
        }
    }
}

const carritos = new Carritos()
export default carritos