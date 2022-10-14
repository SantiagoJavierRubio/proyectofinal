import { getUsuariosDAO } from '../persistencia/factories/usuariosDAO.factory.js'
import CustomError from '../error_handling/customError.js'
import { errorHandler } from '../error_handling/errorHandler.js'
import { errorLogger } from '../loggers/logger.js'
import { registrarUsuario, buscarInfoDelUsuario } from '../logica/auth.js';
import passport from 'passport'

const usuarios = getUsuariosDAO();

export const login = async (req, res, next) => {
    try {
        res.redirect('/')
    }
    catch(err) {
        return next(err)
    }
}

export const register = async (req, res, next) => {
    try {
        const registro = await registrarUsuario(req.body)
        req.login(registro, err => {
            if(err) throw new CustomError(401, err.message)
        })
        const userData = await buscarInfoDelUsuario(registro)
        if(userData) return res.status(201).json({ message: 'Usuario creado', user: userData })
        else throw CustomError(404, 'User not found')
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
        const userData = await buscarInfoDelUsuario(req.user)
        if(userData) return res.send(userData)
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