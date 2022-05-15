import Model from "../../Database/MongoDB/Models/usuario.js"
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"
import { encrypt, compare } from '../../utils/encryption.js'

class Usuario extends ContenedorMongoDB {
    constructor() { super(Model) }
    async createNew(userData) {
        try {
            if(!userData.email || !userData.password ||
            !userData.nombre || !userData.foto || !userData.direccion
            || !userData.edad || !userData.telefono) throw new Error('Campos requeridos faltantes')
            const existe = await this.getOne({email: userData.email})
            if(existe) throw new Error('Email ya registrado')
            const hashedPass = encrypt(userData.password)
            const usuario = await this.save({...userData, password: hashedPass})
            return usuario
        }
        catch(err) {
            return { error: err.message }
        }
    }
    async checkCredentials(email, password) {
        try {
            if(!email || !password) throw new Error('Campos requeridos faltantes')
            const usuario = await this.getOne({email: email}, 'password')
            if(!usuario) throw new Error('Usuario no encontrado')
            const match = compare(password, usuario.password)
            if(!match) throw new Error('Credenciales incorrectas')
            const autorizado = await this.getById(usuario._id, '-password')
            return autorizado
        }
        catch(err) {
            return { error: err.message }
        }
    }
}

const usuarios = new Usuario()
export default usuarios