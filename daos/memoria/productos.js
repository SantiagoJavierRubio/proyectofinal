import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js"
import { v4 as uuid } from 'uuid'

class Productos extends ContenedorMemoria {
    constructor() { super() }

    async createNew({ nombre, descripcion, foto, precio, stock }) {
        try {
            const producto = this.save({
                id: this.getNewId(),
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