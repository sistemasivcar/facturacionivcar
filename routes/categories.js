import categories from "../controllers/categories";
import routerx from 'express-promise-router';
import auth from '../middlewares/auth';
const router = routerx();


router.post('/add', auth.verifyAlmacenero, categories.add);
router.get('/query', auth.verifyAlmacenero, categories.query);
router.get('/list', auth.verifyAlmacenero, categories.list);
router.put('/update', auth.verifyAlmacenero, categories.update);
router.delete('/remove', auth.verifyAlmacenero, categories.remove);
router.put('/act', auth.verifyAlmacenero, categories.act);
router.put('/desact', auth.verifyAlmacenero, categories.desact);

export default router;