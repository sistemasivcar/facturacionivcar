import 'dotenv/config'
require('dotenv').config()
require('./startup/db')();
import logger from './startup/logger/index';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import error from './middlewares/error';
const app = express();




app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

app.use('/api', router)

app.use(error)
const port = process.env.API_PORT || 3000


app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
})


