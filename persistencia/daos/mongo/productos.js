import Model from '../../Database/MongoDB/Models/producto.js'
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import CustomError from '../../../error_handling/customError.js'
import SendProductDTO from '../../DTOs/sendProduct.dto.js'
import { v4 as uuid } from 'uuid'

export default class Productos extends ContenedorMongoDB {
    constructor() { super(Model) }

    async edit(id, userInput) {
        if(!await this.getById(id)) throw new CustomError(404, 'Error al editar: Producto no encontrado')
        const edited = await this.update(id, userInput)
        return new SendProductDTO(edited)
    }

    async findOneById(id) {
        const result = await this.getById(id)
        if(!result) throw new CustomError(404, 'Producto no encontrado')
        return new SendProductDTO(result)
    }

    async listAll() {
        const result = await this.getAll();
        return result.map(product => new SendProductDTO(product))
    }

    async createNew({nombre, descripcion, foto, precio, stock}) {
        const producto = await this.save({
            nombre: nombre,
            descripcion: descripcion,
            codigo: uuid(),
            foto: foto,
            precio: precio,
            stock: stock,
        })
        return new SendProductDTO(producto)
    }

    async remove(id) {
        if(!await this.getById(id)) throw new CustomError(404, 'Error al eliminar: Producto no encontrado')
        const deleted = await this.deleteById(id)
        return new SendProductDTO(deleted)
    }
}