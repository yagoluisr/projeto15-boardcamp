import express from 'express';
import { getCustomers, getCustomersId } from '../Controllers/customersController.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersId);

export default router;