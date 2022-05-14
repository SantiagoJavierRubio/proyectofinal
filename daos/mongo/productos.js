import Model from '../../Database/MongoDB/Models/producto.js'
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import { v4 as uuid } from 'uuid'

class Productos extends ContenedorMongoDB {
    constructor() { super(Model) }

    async createNew({nombre, descripcion, foto, precio, stock}) {
        try {
            const producto = await this.save({
                nombre: nombre,
                descripcion: descripcion,
                codigo: uuid(),
                foto: foto,
                precio: precio,
                stock: stock,
            })
            return producto
        } catch(err) {
            return { error: err.message }
        }
    }
}

const productos = new Productos()
export default productos