import express from 'express';
import { getRentals, insertRental } from '../Controllers/rentalsController.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', insertRental);

export default router;