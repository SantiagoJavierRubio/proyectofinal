import 'dotenv/config';
import MongoDAO from '../daos/mongo/carrito.js';

let carritoDAO;

switch (process.env.DATABASE) {
  default:
    carritoDAO = new MongoDAO();
}

export const getCarritoDAO = () => {
  return carritoDAO;
};
