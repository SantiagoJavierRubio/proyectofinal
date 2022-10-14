import { Router } from 'express';
import checkAuth from '../passport/checkAuth.js';
import {
  eliminarCarrito,
  obtenerLista,
  agregarProductos,
  quitarProducto,
  realizarCompra,
} from '../controladores/carrito.js';

const router = Router();

router.use(checkAuth);
router.get('/', (req, res) => res.render('carrito'));
router.delete('/', eliminarCarrito);
router.get('/productos', obtenerLista);
router.post('/productos', agregarProductos);
router.delete('/productos/:id_prod', quitarProducto);
router.post('/checkout', realizarCompra);

export default router;
