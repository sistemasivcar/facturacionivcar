import users from "../controllers/users";
import routerx from 'express-promise-router';
import auth from "../middlewares/auth";
const router = routerx();

router.post('/add', auth.verifyAdmin, users.add);
router.get('/query', auth.verifyAdmin, users.query);
router.get('/list', users.list);
router.put('/update', auth.verifyAdmin, users.update);
router.delete('/remove', auth.verifyAdmin, users.remove);
router.put('/act', auth.verifyAdmin, users.act);
router.put('/desact', auth.verifyAdmin, users.desact);
router.post('/login', users.login);

export default router;