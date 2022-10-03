import express from 'express';
import { deleteRental, finishesRental, getRentals, insertRental } from '../Controllers/rentalsController.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', insertRental);
router.post('/rentals/:id/return', finishesRental);

router.delete('/rentals/:id', deleteRental);

export default router;