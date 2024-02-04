import express from 'express';
import { testUserController } from '../controllers/testUser.js';




// route object
const route = express.Router();

// routes
route.get('/test-user', testUserController);

// export
export default route; 