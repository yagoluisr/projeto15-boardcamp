import express from 'express';
import { getCustomers } from '../Controllers/customersController.js';

const router = express.Router();

router.get('/customers', getCustomers);

export default router;