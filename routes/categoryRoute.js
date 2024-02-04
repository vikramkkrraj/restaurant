import express from 'express';
import { createCategoryController, deleteCategory, getAllCategories, updateCategory } from './../controllers/categoryControlles.js';
import { validateCredentials } from '../middleware/authMiddleware.js';

const router = express.Router();

//route
// create category
router.post('/create',validateCredentials,createCategoryController);

// get all
router.get("/get", validateCredentials, getAllCategories);

// update 
router.post("/update/:id", validateCredentials, updateCategory);


// delete 
router.delete("/delete/:id", validateCredentials, deleteCategory); 


export default router;