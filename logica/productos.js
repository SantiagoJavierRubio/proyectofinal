import { getProductosDAO } from '../persistencia/factories/productosDAO.factory.js';
import 'dotenv/config';
import CustomError from '../error_handling/customError.js';

const productos = getProductosDAO();

export const obtenerProductos = async (id) => {
  return id ? productos.findOneById(id) : productos.listAll();
};

export const crearProducto = async (productData) => {
  if (
    !productData.nombre ||
    !productData.descripcion ||
    !productData.foto ||
    productData.precio === null ||
    productData.precio === undefined ||
    productData.precio === '' ||
    productData.stock === null ||
    productData.stock === undefined ||
    productData.stock === ''
  )
    throw new CustomError(400, 'Campo requerido faltante');
  if (
    isNaN(parseFloat(productData.precio)) ||
    isNaN(parseInt(productData.stock)) ||
    parseFloat(productData.precio) < 0 ||
    parseInt(productData.stock) < 0
  ) 
    throw new CustomError(400, 'Precio y stock deben ser números positivos');
  return productos.createNew(productData);
};

export const cambiarInfoDeProducto = async (id, data) => {
  if (Object.keys(data).length < 1) throw new CustomError(400, 'Campo requerido faltante');
  if (
    (data.hasOwnProperty('nombre') && !data.nombre) ||
    (data.hasOwnProperty('descripcion') && !data.descripcion) ||
    (data.hasOwnProperty('foto') && !data.foto)
  )
    throw new CustomError(400, 'No puedes dejar campos vacíos');
  if (
    (data.hasOwnProperty('precio') && isNaN(parseFloat(data.precio))) ||
    (data.hasOwnProperty('stock') && isNaN(parseInt(data.stock))) ||
    (data.hasOwnProperty('precio') && parseFloat(data.precio) < 0) ||
    (data.hasOwnProperty('stock') && parseInt(data.stock) < 0)
  ) 
    throw new CustomError(400, 'Precio y stock deben ser números positivos');
  return productos.edit(id, data);
};

export const eliminarProductoPorId = async (id) => {
  return productos.remove(id);
};
