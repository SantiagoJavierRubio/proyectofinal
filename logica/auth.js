import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import usuarios from '../daos/mongo/usuarios.js'
import { enviarNuevoRegistro } from '../messaging/emails.js'
import {errorLogger} from '../loggers/logger.js'

export const login = async (req, res) => {
    try {
        res.redirect('/')
    }
    catch(err) {
        errorLogger.error(err)
        res.status(401).json({ error: err.message })
    }
}

export const register = async (req, res) => {
    try {
        const edad = Date.parse(req.body.edad)
        const num = parsePhoneNumber(`${req.body.areacode}${req.body.telefono}`)
        if(!isValidPhoneNumber(num.number)) throw new Error('Número de teléfono no válido')
        const registro = await usuarios.createNew({...req.body, edad: edad, telefono: num.formatInternational()})
        if(registro.error) throw new Error(registro.error)
        await enviarNuevoRegistro(registro)
        req.login(registro, err => {
            if(err) throw new Error(err.message)
        })
        res.redirect('/')
    }
    catch(err) {
        errorLogger.error(err)
        res.status(401).json({ error: err.message })
    }
}

export const logout = async (req, res) => {
    try {
        req.logout()
        req.session.destroy(() => {
            res.clearCookie('connect.sid')
            res.redirect('/')
        })
    }
    catch(err) {
        errorLogger.error(err)
        res.status(400).json({ error: err.message })
    }
}

export const getUserData = async (req, res) => {
    try {
        if(req.user) return res.send(req.user)
        else throw Error('User not found')
    }
    catch(err) {
        errorLogger.error(err)
        res.status(400).json({ error: err.message })
    }
}