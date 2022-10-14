class ContenedorMongoDB {
    constructor(model) {
        this.model = model
    }

    async save(elemento) {
        try {
            const nuevoElemento = new this.model(elemento)
            await nuevoElemento.save()
            return nuevoElemento
        } catch(err) {
            return new Error(`Error al guardar un nuevo elemento: ${err}`)
        }
    }

    async getAll() {
        try {
            const elementos = await this.model.find().sort('-timestamp')
            return elementos
        } catch(err) {
            return new Error(`Error al obtener elementos: ${err}`)
        }
    }

    async getById(id) {
        try {
            const elemento = await this.model.findById(id)
            if(!elemento) throw new Error('elemento no encontrado')
            return elemento
        } catch(err) {
            return new Error(`Error al obtener elemento: ${err}`)
        }
    }

    async getMany(id_list) {
        try {
            const elementos = await this.model.find({'_id': { $in: id_list }})
            return elementos
        } catch(err) {
            return new Error(`Error al obtener elementos: ${err}`)
        }
    }

    async deleteById(id) {
        try {
            const deleted = await this.model.findByIdAndDelete(id)
            if(!deleted) throw new Error('elemento no encontrado')
            return true
        } catch(err) {
            return new Error(`Error al eliminar elemento: ${err}`)
        }
    }

    async update(id, elemento) {
        try {
            const updated = await this.model.findByIdAndUpdate(id, elemento)
            if(!updated) throw new Error('elemento no encontrado')
            return updated
        } catch(err) {
            return new Error(`Error al actualizar elemento: ${err}`)
        }
    }
}

export default ContenedorMongoDB