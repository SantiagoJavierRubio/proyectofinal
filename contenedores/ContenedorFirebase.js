class ContenedorFirebase {
    constructor(query) {
        this.query = query
    }

    async getNewId() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            let newID = 0
            for(let item of docs) {
                if(Number(item.id) >= newID){
                    newID = Number(item.id)+1
                }
            }
            return newID
        } catch(err) {
            return new Error(`Error al generar un nuevo id: ${err}`)
        }
    }

    async save(elemento) {
        try {
            const id = await this.getNewId()
            const doc = this.query.doc(`${id}`)
            elemento.timestamp = Date.now()
            elemento.id = id
            await doc.create(elemento)
            const nuevoElemento = await doc.get()
            return nuevoElemento.data()
        } catch(err) {
            return new Error(`Error al guardar un nuevo elemento: ${err}`)
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const elementos = docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            return elementos
        } catch(err) {
            return new Error(`Error al obtener elementos: ${err}`)
        }
    }

    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const elemento = await doc.get()
            if(!elemento.data()) throw new Error('elemento no encontrado')
            return { id, ...elemento.data()}
        } catch(err) {
            return new Error(`Error al obtener elemento: ${err}`)
        }
    }

    async getMany(id_list) {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const elementos = docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            return [ ...elementos.filter(el => id_list.includes(el.id)) ]
        } catch(err) {
            return new Error(`Error al obtener elementos: ${err}`)
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const deleted = await doc.delete()
            if(!deleted) throw new Error('elemento no encontrado')
            return true
        } catch(err) {
            return new Error(`Error al eliminar elemento: ${err}`)
        }
    }

    async update(id, elemento) {
        try {
            const doc = this.query.doc(`${id}`)
            const updated = await doc.update(elemento)
            if(!updated) throw new Error('elemento no encontrado')
            return updated.data()
        } catch(err) {
            return new Error(`Error al actualizar elemento: ${err}`)
        }
    }
}

export default ContenedorFirebase