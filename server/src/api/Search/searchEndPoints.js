import { Router } from 'express';
import searchProyects from '../../controllers/SearchProyects/searchProyects.js'


const searchRouter = Router();

searchRouter.get('/searchProyects', searchProyects);

export default searchRouter;