import ContenedorArchivos from '../../contenedores/ContenedorArchivos.js'
import { v4 as uuid } from 'uuid'

class Productos extends ContenedorArchivos {

    constructor() { super('productos.json') }

    async createNew({nombre, descripcion, foto, precio, stock}) {
        try {
            const producto = await this.save({
                id: await this.getNewId(),
                timestamp: Date.now(),
                nombre: nombre,
                descripcion: descripcion,
                codigo: uuid(),
                foto: foto,
                precio: precio,
                stock: stock,
            })
            return producto
        } catch(err) {
            return new Error(`Error al crear producto: ${err}`)
        }
    }
}

export default Productos