import mongoose from 'mongoose';
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import Model from '../../Database/MongoDB/Models/carrito.js';
import SendCarritoDTO from '../../DTOs/sendCarrito.dto.js';
import CustomError from '../../../error_handling/customError.js';

export default class Carrito extends ContenedorMongoDB {
  constructor() {
    super(Model);
  }

  checkForValidIds(idList) {
    return idList.filter((id) => mongoose.Types.ObjectId.isValid(id));
  }

  async getUniqueOrCreate(userId) {
    if (!userId) throw new CustomError(404, 'Usuario no encontrado');
    const exists = await this.getOne({ owner: userId });
    if (exists) return exists._id;
    const carrito = await this.save({ productos: [], owner: userId });
    return carrito._id;
  }

  async getProducts(userId) {
    const id = await this.getUniqueOrCreate(userId);
    const carro = await this.getById(id);
    if (!carro) throw new CustomError(404, 'Carro no encontrado');
    return carro.productos || [];
  }

  async addProducts(userId, productList) {
    const id = await this.getUniqueOrCreate(userId);
    const carro = await this.getById(id);
    if (!carro) throw new CustomError(404, 'Carro no encontrado');
    const validProductList = this.checkForValidIds(productList);
    carro.productos = [...carro.productos, ...validProductList];
    await this.update(id, carro);
    return new SendCarritoDTO(carro);
  }

  async removeProduct(userId, productId) {
    const id = await this.getUniqueOrCreate(userId);
    const carro = await this.getById(id);
    if (!carro) throw new CustomError(404, 'Carro no encontrado');
    carro.productos = carro.productos.filter((prod) => prod !== productId);
    await this.update(id, carro);
    return new SendCarritoDTO(carro);
  }

  async empty(userId) {
    const id = await this.getUniqueOrCreate(userId);
    const carro = await this.getById(id);
    if (!carro) throw new CustomError(404, 'Carro no encontrado');
    if (carro.productos.length < 1)
      throw new CustomError(400, 'El carro ya está vacío');
    carro.productos = [];
    await this.update(id, carro);
    return new SendCarritoDTO(carro);
  }
}
