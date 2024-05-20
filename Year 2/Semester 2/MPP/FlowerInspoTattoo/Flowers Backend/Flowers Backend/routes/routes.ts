import express, { Router } from 'express';
import FlowerController from '../controller/FlowerController';
import StyleController from '../controller/StyleController';

const router = Router();

// Mount the FlowerController routes
router.use('/flowers', FlowerController);
router.use('/styles', StyleController);

export default router;
