import ventas from "../controllers/ventas";
import routerx from 'express-promise-router';
import auth from '../middlewares/auth';
const router = routerx();


router.post('/add', ventas.add);
router.get('/query', ventas.query);
router.get('/list', ventas.list);
router.get('/resumen', ventas.resumen);
router.put('/update', ventas.update);
router.put('/act', ventas.act);
router.put('/desact', ventas.desact);
router.get('/grafico12meses', ventas.grafico12Meses);
router.get('/entreFechas', ventas.entreFechas);

export default router;