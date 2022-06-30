import mongoose from 'mongoose'

const schemaProductos = new mongoose.Schema({
    nombre: String,
    timestamp: {
        type: Date,
        default: Date.now()
    },
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number
})

const Productos = mongoose.model('productos', schemaProductos)

export default Productos