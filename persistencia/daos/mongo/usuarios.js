import Model from "../../Database/MongoDB/Models/usuario.js"
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import CustomError from '../../../error_handling/customError.js'
import { encrypt, compare } from '../../../utils/encryption.js'

export default class Usuario extends ContenedorMongoDB {
    constructor() { super(Model) }
    async createNew(userData) {
        if(!userData.email || !userData.password ||
        !userData.nombre || !userData.foto || !userData.direccion
        || !userData.edad || !userData.telefono) throw new CustomError(400, 'Campos requeridos faltantes')
        const existe = await this.getOne({email: userData.email})
        if(existe) throw new CustomError(409, 'Email ya registrado')
        const hashedPass = encrypt(userData.password)
        const usuario = await this.save({...userData, password: hashedPass})
        return usuario
    }
    async checkCredentials(email, password) {
        if(!email || !password) throw new CustomError(400, 'Campos requeridos faltantes')
        const usuario = await this.getOne({email: email}, 'password')
        if(!usuario) throw new CustomError(404, 'Usuario no encontrado')
        const match = compare(password, usuario.password)
        if(!match) throw new CustomError(401, 'Credenciales incorrectas')
        const autorizado = await this.getById(usuario._id, '-password')
        return autorizado
    }
}