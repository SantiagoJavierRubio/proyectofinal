import { getProductosDAO } from '../persistencia/factories/productosDAO.factory.js';
import 'dotenv/config';

const productos = getProductosDAO();

export const obtenerProductos = async (id) => {
  return id ? productos.findOneById(id) : productos.listAll();
};

export const crearProducto = async (productData) => {
  return productos.createNew(productData);
};

export const cambiarInfoDeProducto = async (id, data) => {
  return productos.edit(id, data);
};

export const eliminarProductoPorId = async (id) => {
  return productos.remove(id);
};
