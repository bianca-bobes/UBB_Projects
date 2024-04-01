import express, { Router } from 'express';
import FlowerController from '../controller/FlowerController';

const router = Router();

// Mount the FlowerController routes
router.use('/flowers', FlowerController);

export default router;
