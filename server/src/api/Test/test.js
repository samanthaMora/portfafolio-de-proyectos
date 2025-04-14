import { Router } from 'express';
import ping from '../../controllers/Basics/pingController.js';

const pruebasRouter = Router();

pruebasRouter.get('/ping', ping);

export default pruebasRouter;