import "dotenv/config"

const getDaos = async () => {
    switch(process.env.DATA_ACCESS_TYPE){
        case 'MEMORIA':
            const { default: CarritoMemoria } = await import('./memoria/carrito.js')
            const { default: ProductosMemoria } = await import('./memoria/productos.js')
            return { carritos: new CarritoMemoria(), productos: new ProductosMemoria() }
        case 'ARCHIVO':
            const { default: CarritoArchivo } = await import('./archivo/carrito.js')
            const { default: ProductosArchivo } = await import('./archivo/productos.js')
            return { carritos: new CarritoArchivo(), productos: new ProductosArchivo() }
        case 'MONGODB':
            const { default: CarritoMongo } = await import('./mongo/carrito.js')
            const { default: ProductosMongo } = await import('./mongo/productos.js')
            return { carritos: new CarritoMongo(), productos: new ProductosMongo() }
        case 'FIREBASE':
            break
        default:
            throw new Error('Error al cargar la data: Variable de entorno no encontrada')
    }
}

const daos = await getDaos()

export default daos