import routerx from 'express-promise-router';
import proveedores from '../controllers/proveedores';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add', auth.verifyAlmacenero, proveedores.add);
router.get('/query', auth.verifyAlmacenero, proveedores.query);
router.get('/list', auth.verifyAlmacenero, proveedores.list);
router.put('/update', auth.verifyAlmacenero, proveedores.update);
router.delete('/remove', auth.verifyAlmacenero, proveedores.remove);
router.put('/act', auth.verifyAlmacenero, proveedores.act);
router.put('/desact', auth.verifyAlmacenero, proveedores.desact);

export default router;