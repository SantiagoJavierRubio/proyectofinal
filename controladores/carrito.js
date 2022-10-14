import { eliminarProductosDelCarrito, 
    listarProductosDelCarrito, 
    agregarProductosYDevolverCarrito, 
    quitarProductoDelCarrito, 
    realizarCompraYVaciarCarrito
} from '../logica/carrito.js'

export const eliminarCarrito = async (req, res, next) => {
    try{
        await eliminarProductosDelCarrito(req.user._id)
        res.status(200).json({ message: 'Carrito vaciado correctamente' })
    } catch(err) {
        next(err)
    }
}
export const obtenerLista = async (req, res, next) => {
    try{
        const listaProductos = await listarProductosDelCarrito(req.user._id)
        if(!listaProductos) return res.sendStatus(500)
        res.status(200).json(listaProductos)
    } catch(err) {
        next(err)
    }
}
export const agregarProductos = async (req, res, next) => {
    try{
        const carritoActualizado = await agregarProductosYDevolverCarrito(req.user._id, req.body.productos)
        res.status(200).json(carritoActualizado)
    } catch(err) {
        next(err)
    }
}
export const quitarProducto = async (req, res, next) => {
    try{
        const deletedProduct = await quitarProductoDelCarrito(req.user._id, req.params.id_prod)
        res.status(200).json(deletedProduct)
    } catch(err) {
        next(err)
    }
}

export const realizarCompra = async (req, res, next) => {
    try {
        await realizarCompraYVaciarCarrito(req.user)
        res.status(200).json({ message: 'Compra realizada con éxito' })
    }
    catch(err) {
        next(err)
    }
}