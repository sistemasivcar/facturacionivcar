import routerx from 'express-promise-router';
import articles from '../controllers/articles';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add', articles.add);
router.get('/query', auth.verifyAlmacenero, articles.query);
router.get('/queryCod', auth.verifyAlmacenero, articles.query);
router.get('/list', auth.verifyAlmacenero, articles.list);
router.put('/update', auth.verifyAlmacenero, articles.update);
router.delete('/remove', auth.verifyAlmacenero, articles.remove);
router.put('/act', auth.verifyAlmacenero, articles.act);
router.put('/desact', auth.verifyAlmacenero, articles.desact);

export default router;