import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import usuarios from '../persistencia/daos/mongo/usuarios.js'
import { enviarNuevoRegistro } from '../messaging/emails.js'
import CustomError from '../error_handling/customError.js'
import { errorHandler } from '../error_handling/errorHandler.js'
import { errorLogger } from '../loggers/logger.js'
import passport from 'passport'

export const login = async (req, res, next) => {
    try {
        res.redirect('/')
    }
    catch(err) {
        return next(err)
    }
}

const validatePhoneNumber = (areacode, phone) => {
    try {
        const num = parsePhoneNumber(`${areacode}${phone}`)
        if(!isValidPhoneNumber(num.number)) throw new Error('Número de teléfono no válido')
        return num;
    } catch (err) {
        throw new CustomError(400, `Error al validar el teléfono: ${err.message}`)
    }
}

export const register = async (req, res, next) => {
    try {
        const edad = Date.parse(req.body.edad)
        const num = validatePhoneNumber(req.body.areacode, req.body.telefono);
        const registro = await usuarios.createNew({...req.body, edad: edad, telefono: num.formatInternational()})
        await enviarNuevoRegistro(registro)
        req.login(registro, err => {
            if(err) throw new CustomError(401, err.message)
        })
        res.redirect('/')
    }
    catch(err) {
        return next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        req.logout()
        req.session.destroy(() => {
            res.clearCookie('connect.sid')
            res.redirect('/')
        })
    }
    catch(err) {
        return next(err)
    }
}

export const getUserData = async (req, res, next) => {
    try {
        if(req.user) return res.send(req.user)
        else throw CustomError(404, 'User not found')
    }
    catch(err) {
        return next(err)
    }
}

export const serveAdmin = async (req, res, next) => {
    if(process.env.ADMIN_MODE) {
        return res.render('admin')
    } else {
        res.status(401).json({
            error: -1,
            description: `ruta '${req.url} método ${req.method} no autorizada`
        })
    }
}