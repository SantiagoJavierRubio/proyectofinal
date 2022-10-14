import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import { getUsuariosDAO } from '../persistencia/factories/usuariosDAOFactory.js'
import { enviarNuevoRegistro } from '../messaging/emails.js'
import CustomError from '../error_handling/customError.js'

const usuarios = getUsuariosDAO()

const validatePhoneNumber = (areacode, phone) => {
    try {
        const num = parsePhoneNumber(`${areacode}${phone}`)
        if(!isValidPhoneNumber(num.number)) throw new Error('Número de teléfono no válido')
        return num;
    } catch (err) {
        throw new CustomError(400, `Error al validar el teléfono: ${err.message}`)
    }
}

export const registrarUsuario = async (userData) => {
    const edad = Date.parse(userData.edad)
    const num = validatePhoneNumber(userData.areacode, userData.telefono);
    const registro = await usuarios.createNew({...userData, edad: edad, telefono: num.formatInternational()})
    await enviarNuevoRegistro(registro)
    return registro
}