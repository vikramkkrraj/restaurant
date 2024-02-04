import express from 'express';
import { createFood, getAllFood,getFoodById,getFoodByRestaurantID, updateFoodById,deleteFoodById} from '../controllers/foodControllers.js';
import { validateCredentials } from './../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.post('/create', validateCredentials,createFood);

// all food
router.get('/getall', getAllFood);

// get single food
router.get('/getfood/:id', getFoodById)

// get food by Restaurant 
router.get('/getfoodbyrestaurant/:id', getFoodByRestaurantID);

// update food
router.post('/update/:id', validateCredentials,updateFoodById);

// delete food by id
router.delete('/delete/:id', validateCredentials, deleteFoodById)

export default router;