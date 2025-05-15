import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js'
import loginRouter from './Login/loginEndPoints.js';
import perfilRouter from './Profile/profileEndPoints.js';
import searchRouter from './Search/searchEndPoints.js';
import userRouter from './User/userEndPonits.js';
import pruebasRouter from './Test/test.js';
import categoriesRouter from './Proyectos/categoryRoutes.js';
import tagsRouter from './Proyectos/tagRoutes.js';
import tecRouter from './Proyectos/technologyRoutes.js'
import projectsRouter from './Proyectos/projectRoutes.js';
import downloadRepoRouter from './Proyectos/downloadRepoRouter.js';
import publicRouter from "./public/publicRouter.js";
import comentariosRouter from "./public/comentariosRouter.js";
import calificacionesRouter from "./Calificaciones/calificacionesRouter.js";



const router = Router();


router.use('/', pruebasRouter)

router.use('/', loginRouter)

router.use('/', userRouter)

router.use('/', downloadRepoRouter);

router.use("/public", publicRouter);

router.use('/categorias', categoriesRouter);

router.use("/", calificacionesRouter);

router.use('/etiquetas', tagsRouter);

router.use('/tecnologias', tecRouter);

router.use("/", comentariosRouter);

router.use('/proyectos', verifyToken, projectsRouter);

router.use('/', verifyToken , perfilRouter)

router.use('/', verifyToken , searchRouter)




export default router;