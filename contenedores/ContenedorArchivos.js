import fs from 'fs'

class ContenedorArchivos {
    constructor(filename){
        this.filepath = `./persist/DB/${filename}`
    }

    async getNewId() {
        try {
            if(fs.existsSync(this.filepath)){
                const fileRead = await fs.promises.readFile(this.filepath)
                const fileData = JSON.parse(fileRead)
                let newID = 0
                for(let item of fileData) {
                    if(item.id >= newID){
                        newID = item.id+1
                    }
                }
                return newID
            } else {
               return 0
            }
        } catch(err) {
            return new Error(`Error al generar un nuevo id: ${err}`)
        }
    }

    async save(elemento) {
        try {
            if(fs.existsSync(this.filepath)){
                const fileRead = await fs.promises.readFile(this.filepath)
                const fileData = JSON.parse(fileRead)
                const newList = [ ...fileData, elemento ]
                await fs.promises.writeFile(this.filepath, JSON.stringify(newList))
            } else {
                await fs.promises.writeFile(this.filepath, JSON.stringify([elemento]))
            }
            return elemento
        } catch(err) {
            return new Error(`Error al guardar un nuevo elemento: ${err}`)
        }
    }

    async getAll() {
        try {
            if(!fs.existsSync(this.filepath)) throw new Error('Archivo no disponible')
            const fileRead = await fs.promises.readFile(this.filepath)
            const fileData = JSON.parse(fileRead)
            return fileData
        } catch(err) {
            return err
        }
    }

    async getById(id) {
        try {
            if(!fs.existsSync(this.filepath)) throw new Error('Archivo no disponible')
            const fileRead = await fs.promises.readFile(this.filepath)
            const fileData = JSON.parse(fileRead)
            const elemento = fileData.filter(file => file.id == id)[0]
            if(!elemento) throw new Error('Elemento no encontrado')
            return elemento
        } catch(err) {
            return err
        }
    }

    async getMany(id_list) {
        try {
            if(!fs.existsSync(this.filepath)) throw new Error('Archivo no disponible')
            const fileRead = await fs.promises.readFile(this.filepath)
            const fileData = JSON.parse(fileRead)
            const elementos = fileData.filter(file => id_list.includes(file.id))
            if(elementos.length < 1) throw new Error('Elementos no encontrados')
            return elementos
        } catch(err) {
            return err
        }
    }

    async deleteById(id) {
        try {
            if(!fs.existsSync(this.filepath)) throw new Error('Archivo no disponible')
            const fileRead = await fs.promises.readFile(this.filepath)
            const fileData = JSON.parse(fileRead)
            const newList = fileData.filter(file => file.id != id)
            await fs.promises.writeFile(this.filepath, JSON.stringify(newList))
            return true
        } catch(err) {
            return err
        }
    }
    
    async update(id, elemento) {
        try {
            if(!fs.existsSync(this.filepath)) throw new Error('Archivo no disponible')
            const fileRead = await fs.promises.readFile(this.filepath)
            const fileData = JSON.parse(fileRead)
            const elem = fileData.filter(file => file.id == id)[0]
            if(!elem) throw new Error('Elemento no encontrado')
            for(let [key, value] of Object.entries(elemento)) {
                if(elem[key] != value) elem[key] = value
            }
            const newList = [ ...fileData.filter(file => file.id != id), elem ]
            await fs.promises.writeFile(this.filepath, JSON.stringify(newList))
            return elem
        } catch(err) {
            return err
        }
    }
}

export default ContenedorArchivos