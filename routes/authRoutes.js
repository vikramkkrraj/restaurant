import express from 'express';
import { loginController, registerController } from '../controllers/authControllers.js';

const router = express.Router();


// routes
// REGISTER || POST
router.route('/register').post(registerController);

// LOGIN || POST
router.post('/login', loginController);



export default router; 