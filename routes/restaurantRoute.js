import express from 'express';
import { validateCredentials } from './../middleware/authMiddleware.js';
import { createRestaurant, deleteRestaurantById, getAllRestarurant, getRestaurantById } from '../controllers/restaurantControllers.js';

const router = express.Router();

// Routes
// create restaurant
router.post("/create", validateCredentials,createRestaurant);

// get all restaurant
router.get("/getall", getAllRestarurant);

// get one restaurant by id
router.get("/get/:id", getRestaurantById);

// get delete restaurant by id
router.delete("/delete/:id", validateCredentials, deleteRestaurantById)


export default router;
