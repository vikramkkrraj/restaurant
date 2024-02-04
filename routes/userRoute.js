import express from "express";
import {
  deleteUserAccount,
  getUser,
  resetPasswor,
  updatePassword,
  updateUser,
} from "../controllers/userController.js";
import { validateCredentials } from "../middleware/authMiddleware.js";

const router = express.Router();

//  routes
// GET User || GET Method
router.get("/getuser", validateCredentials, getUser);

// Update User|| POST
router.post("/updateuser", validateCredentials, updateUser);

// Reset Password || POST
router.post("/reset", validateCredentials, resetPasswor);

// Update Password || POST
router.post("/updatepassword", validateCredentials, updatePassword);

// Deleter User Account || DELETE
router.delete("/deleteUser/:id",validateCredentials,  deleteUserAccount);

export default router;
