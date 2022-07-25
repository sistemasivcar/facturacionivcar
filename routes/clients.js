import routerx from 'express-promise-router';
import clients from '../controllers/clients';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add', clients.add);
router.get('/query', clients.query);
router.get('/list', clients.list);
router.put('/update', clients.update);
router.delete('/remove', clients.remove);
router.put('/act', clients.act);
router.put('/desact', clients.desact);

export default router;