import fs from 'fs'

class Carrito {
    constructor(productos=[]) {
        this.id = Carrito.incrementID()
        this.timestamp = Date.now()
        this.productos = productos
    }
    static incrementID() {
        if(!this.latestID) this.latestID = 1
        else this.latestID++
        return this.latestID
    }
    filePath = './persist/DB/carritos.json'

    async save() {
        const cartData = {
            id: this.id,
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

export default class Carritos {
    filePath = './persist/DB/carritos.json'

    async createNew(productos) {
        try {
            const cart = new Carrito(productos)
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
            return fileData.filter(cart => cart.id == id).productos
        } catch(err) {
            console.error(err)
            return null
        }
    }
    async addProducts(id, product) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const carro = fileData.filter(cart => cart.id == id)[0]
            carro.productos = [ ...carro.productos, product ]
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