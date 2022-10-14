import 'dotenv/config';
import MongoDAO from '../daos/mongo/usuarios.js';

let usuariosDAO;

switch (process.env.DATABASE) {
  default:
    usuariosDAO = new MongoDAO();
}

export const getUsuariosDAO = () => {
  return usuariosDAO;
};
