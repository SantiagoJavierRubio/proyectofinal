import { Router } from 'express'
import checkAuth from '../passport/checkAuth.js'
import { eliminarCarrito,
    obtenerLista,
    agregarProductos,
    quitarProducto} from '../logica/carrito.js'

const router = Router()

router.use(checkAuth)
router.delete('/', eliminarCarrito)
router.get('/productos', obtenerLista)
router.post('/productos', agregarProductos)
router.delete('/productos/:id_prod', quitarProducto)

export default router