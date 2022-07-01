import 'dotenv/config';
import MongoDAO from '../daos/mongo/productos.js';

let productosDAO;

switch (process.env.DATABASE) {
  default:
    productosDAO = new MongoDAO();
}

export const getProductosDAO = () => {
  return productosDAO;
};
