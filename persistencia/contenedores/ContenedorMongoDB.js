/* eslint-disable new-cap */
import mongoose from 'mongoose';

class ContenedorMongoDB {
  constructor(model) {
    this.model = model;
  }

  checkValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async save(elemento) {
    const nuevoElemento = new this.model(elemento);
    await nuevoElemento.save();
    return nuevoElemento;
  }

  async getOne(match, fields = null) {
    const result = fields
      ? await this.model.findOne(match, fields)
      : await this.model.findOne(match);
    if (!result) return null;
    return result;
  }

  async getAll() {
    return this.model.find();
  }

  async getById(id, fields = null) {
    if (!this.checkValidId(id)) return null;
    const result = fields
      ? await this.model.findById(id, fields)
      : await this.model.findById(id);
    if (!result) return null;
    return result;
  }

  async getMany(idList) {
    return this.model.find({ _id: { $in: idList } });
  }

  async deleteById(id) {
    if (!this.checkValidId(id)) return null;
    return this.model.findByIdAndDelete(id);
  }

  async update(id, elemento) {
    if (!this.checkValidId(id)) return null;
    return this.model.findByIdAndUpdate(id, elemento);
  }
}

export default ContenedorMongoDB;
