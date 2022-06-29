import Model from '../../Database/MongoDB/Models/producto.js'
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import CustomError from '../../../error_handling/customError.js'
import { v4 as uuid } from 'uuid'

class Productos extends ContenedorMongoDB {
    constructor() { super(Model) }

    async edit(id, userInput) {
        if(!await this.getById(id)) throw new CustomError(404, 'Error al editar: Producto no encontrado')
        return await this.update(id, userInput)
    }

    async findOneById(id) {
        const result = await this.getById(id)
        if(!result) throw new CustomError(404, 'Producto no encontrado')
        return result
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
            return { error: err.message }
        }
    }

    async remove(id) {
        if(!await this.getById(id)) throw new CustomError(404, 'Error al eliminar: Producto no encontrado')
        return await this.deleteById(id)
    }
}

const productos = new Productos()
export default productos