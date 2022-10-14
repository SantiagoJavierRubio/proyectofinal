import "dotenv/config"
import mongoDAO from '../daos/mongo/usuarios.js'

let usuariosDAO

switch(process.env.DATABASE) {
    default:
        usuariosDAO = new mongoDAO()
}

export const getUsuariosDAO = () => {
    return usuariosDAO
}