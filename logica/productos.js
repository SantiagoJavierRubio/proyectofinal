import productos from '../daos/mongo/productos.js'

export const getAll = async (req, res, next) => {
    try {
        const id = req.params.id
        if(id){
            const product = await productos.getById(id)
            if(!product) return res.sendStatus(404)
            return res.status(200).json(product) 
        } else {
            const productList = await productos.getAll()
            if(!productList) return res.sendStatus(500)
            return res.status(200).json(productList)
        }
    } catch(err) {
        console.error(err)
    }
}
export const nuevoProducto = async (req, res, next) => {
    try {
        const userInput = req.body
        const addedProduct = await productos.createNew(userInput)
        if(!addedProduct) return res.sendStatus(500)
        return res.status(200).send(addedProduct)
    } catch(err) {
        console.error(err)
    }
}
export const editarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const exists = await productos.getById(id)
        if(!exists) return res.sendStatus(404)
        const userInput = req.body
        const editedProduct = await productos.update(id, userInput)
        if(!editedProduct) return res.sendStatus(500)
        return res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const eliminarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        const exists = await productos.getById(id)
        if(!exists) return res.sendStatus(404)
        const deletedProduct = await productos.deleteById(id)
        if(!deletedProduct) return res.sendStatus(500)
        return res.sendStatus(200)
    } catch(err) {
        console.error(err)
    }
}
export const revisarAutorizacion = async (req, res, next) => {
    // Aquí iría la lógica para revisar si el usuario está o no autorizado
    const administrador = true
    // -- //
    if(administrador) {
        return next()
    } else {
        res.status(401).json({
            error: -1,
            description: `ruta '${req.url} método ${req.method} no autorizada`
        })
    }
}
