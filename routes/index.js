import routerx from 'express-promise-router';
import articlesRouter from '../routes/articles';
import categoriesRouter from '../routes/categories';
import usersRouter from '../routes/users';
import proveedoresRouter from '../routes/proveedores';
import clientsRouter from '../routes/clients';
import ingresosRouter from '../routes/ingresos';
import ventasRouter from '../routes/ventas'
const router = routerx();

router.use('/categories', categoriesRouter);
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);
router.use('/proveedores', proveedoresRouter);
router.use('/ingresos', ingresosRouter);
router.use('/ventas', ventasRouter);

export default router;
