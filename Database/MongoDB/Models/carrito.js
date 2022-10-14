import mongoose from 'mongoose'

const schemaCarrito = new mongoose.Schema({
    owner: mongoose.Types.ObjectId,
    timestamp: {
        type: Date,
        default: Date.now()
    },
    productos: [Object]
})

const Carrito = mongoose.model('carritos', schemaCarrito)

export default Carrito