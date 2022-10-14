import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
import { v4 as uuid } from 'uuid'

class Productos extends ContenedorFirebase {
    constructor(db) {
        super(db.collection('productos'))
    }

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
            return new Error(`Error al crear producto: ${err}`)
        }
    }
}

export default Productos