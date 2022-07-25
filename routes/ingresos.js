import ingresos from "../controllers/ingresos";
import routerx from 'express-promise-router';
import auth from '../middlewares/auth';
const router = routerx();


router.post('/add', ingresos.add);
router.get('/query', ingresos.query);
router.get('/list', ingresos.list);
router.put('/act', ingresos.act);
router.put('/desact', ingresos.desact);
router.get('/grafico12meses', ingresos.grafico12Meses);
router.get('entreFechas', ingresos.entreFechas);

export default router;