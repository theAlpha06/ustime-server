import express from 'express';
import { setProfilePicture, getAllUsers, getCurrentUser } from '../controllers/user.js';

const router = express.Router();

router.post('/avatar/:id', setProfilePicture);
router.get('/getallusers/:id', getAllUsers);
router.get('/currentuser/:id', getCurrentUser);

export default router;