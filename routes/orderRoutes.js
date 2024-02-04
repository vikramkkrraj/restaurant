import express from 'express';
import { validateCredentials } from '../middleware/authMiddleware.js';
import { placeOrder } from '../controllers/orderControllers.js';
import { adminAuth } from '../middleware/adminMiddleware.js';
import { checkUserAdminAndUpdateOrderStatus } from '../controllers/adminController.js';


const router = express.Router();

// routes
router.post('/placeorder', validateCredentials, placeOrder);

router.post('/orderstatus/:id', validateCredentials,adminAuth, checkUserAdminAndUpdateOrderStatus)


export default router;