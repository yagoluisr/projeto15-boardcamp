import express from 'express';
import { getCustomers, getCustomersId, insertCustomer, updateCustomer } from '../Controllers/customersController.js';
import { validateCustomer } from '../Middleware/customersMiddleware.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersId);

router.post('/customers', validateCustomer, insertCustomer);

router.put('/customers/:id', validateCustomer, updateCustomer);


export default router;