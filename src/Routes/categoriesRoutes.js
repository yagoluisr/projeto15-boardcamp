import express from 'express';
import { getCategories, insertCategories } from '../Controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', insertCategories);

export default router;