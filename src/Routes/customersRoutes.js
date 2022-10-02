import express from 'express';
import { getCustomers, getCustomersId, insertCustomer } from '../Controllers/customersController.js';
import { validateCustomer } from '../Middleware/customersMiddleware.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersId);

router.post('/customers', validateCustomer, insertCustomer);

export default router;