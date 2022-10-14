import fs from 'fs'
import { v4 as uuid } from 'uuid'

class Producto {
    constructor({nombre, descripcion, foto, precio, stock}) {
        this.id = Producto.incrementID()
        this.timestamp = Date.now()
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = uuid()
        this.foto = foto
        this.precio = precio
        this.stock = stock
    }
    static incrementID() {
        if(!this.latestID) this.latestID = 1
        else this.latestID++
        return this.latestID
    }
    filePath = './persist/DB/productos.json'

    async save() {
        const productData = {
            id: this.id,
            timestamp: this.timestamp,
            nombre: this.nombre,
            descripcion: this.descripcion,
            codigo: this.codigo,
            foto: this.foto,
            precio: this.precio,
            stock: this.stock
        }
        try {
            if(fs.existsSync(this.filePath)){
                const fileRead = await fs.promises.readFile(this.filePath)
                const fileData = JSON.parse(fileRead)
                const newList = [ ...fileData, productData ]
                await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            } else {
                await fs.promises.writeFile(this.filePath, JSON.stringify([productData]))
            }
            return true
        } catch(err) {
            console.error(err)
            return false
        }
    }
}

export default class Productos {
    filePath = './persist/DB/productos.json'

    async createNew(productData) {
        try {
            const producto = new Producto(productData)
            return await producto.save()
        } catch(err) {
            console.error(err)
            return false
        }
    }
    async getAll() {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            return fileData
        } catch(err) {
            console.error(err)
            return null
        }
    }
    async getById(id) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const product = fileData.filter(file => file.id == id)[0]
            if(!product) throw new Error('Producto no encontrado')
            return product
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
    async updateById(id, productData) {
        try {
            const fileRead = await fs.promises.readFile(this.filePath)
            const fileData = JSON.parse(fileRead)
            const product = fileData.filter(file => file.id == id)[0]
            if(!product) throw new Error('Producto no encontrado')
            for(let [key, value] of Object.entries(productData)) {
                if(product[key] != value) product[key] = value
            }
            const newList = [ ...fileData.filter(file => file.id != id), product ]
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList))
            return true
        } catch(err) {
            console.error(err)
            return false
        }
    }
}