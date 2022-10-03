import express from 'express';
import { finishesRental, getRentals, insertRental } from '../Controllers/rentalsController.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', insertRental);
router.post('/rentals/:id/return', finishesRental);


export default router;