import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js'
import loginRouter from './Login/loginEndPoints.js';
import perfilRouter from './Profile/profileEndPoints.js';
import searchRouter from './Search/searchEndPoints.js';
import pruebasRouter from './Test/test.js';

const router = Router();

router.use('/', pruebasRouter)

router.use('/', loginRouter)

router.use('/', verifyToken , perfilRouter)

router.use('/', verifyToken , searchRouter)

export default router;