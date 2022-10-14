import passport from 'passport'
import usuarios from '../daos/mongo/usuarios.js'

export const login = async (req, res) => {
    try {
        res.redirect('/')
    }
    catch(err) {
        res.status(401).json({ error: err.message })
    }
}

export const register = async (req, res) => {
    try {
        const edad = Date.parse(req.body.edad)
        const registro = await usuarios.createNew({...req.body, edad: edad})
        if(!registro) throw new Error('Error al registrar usuario')
        if(registro.error) throw new Error(registro.error)
        req.login(registro, err => {
            if(err) throw new Error(err.message)
        })
        res.redirect('/')
    }
    catch(err) {
        res.status(401).json({ error: err.message })
    }
}

export const logout = async (req, res) => {
    try {
        req.logOut()
        res.redirect('/login')
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}