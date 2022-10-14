class ContenedorMemoria {
    constructor() {
        this.elementos = []
    }

    getNewId() {
        let newID = 0
        for(let item of this.elementos) {
            if(item.id >= newID){
                newID = item.id+1
            }
        }
        return newID
    }

    getById(id) {
        const elemento = this.elementos.find(el => el.id == Number(id))
        if(!elemento){
            throw new Error('Error al obtener un elemento: elemento no encontrado')
        } else {
            return elemento
        }
    }

    getAll() {
        return [ ...this.elementos ]
    }

    getMany(id_list) {
        return [ ...this.elementos.filter(el => id_list.includes(el.id))]
    }

    save(elemento) {
        this.elementos = [ ...this.elementos, elemento ]
        return elemento
    }

    update(id, elemento) {
        const index = this.elementos.findIndex(el => el.id == id)
        if(index == -1) {
            throw new Error('Error al actualizar elemento: elemento no encontrado')
        } else {
            this.elementos[index] = elemento
            return elemento
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(el => el.id == Number(id))
        if(index == -1) {
            throw new Error('Error al eliminar elemento: elemento no encontrado')
        } else {
            return this.elementos.splice(index, 1)
        }
    }
}

export default ContenedorMemoria