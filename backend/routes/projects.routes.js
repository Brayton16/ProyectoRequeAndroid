import { Router } from "express";
import {getProyects, getProyect, createProyect, updateProyect, deleteProyect, getProyectsByCategory, getProyectsByLimitDate, getProyectsByFundingGoal, getProyectsByCollection, activeProjectsCount}  from "../models/projects.models.js";

const router = Router();

router.get('/proyectos', getProyects);

router.get('/proyectos/categoria', getProyectsByCategory);
router.get('/proyectos/objetivo', getProyectsByFundingGoal);
router.get('/proyectos/recaudado', getProyectsByCollection);
router.get('/proyectos/fechaLimite', getProyectsByLimitDate);

router.get('/proyecto', getProyect);

router.post('/proyecto', createProyect);

router.put('/proyecto', updateProyect);

router.delete('/proyecto', deleteProyect);

router.get("/proyecto/active/count", activeProjectsCount);


export default router;