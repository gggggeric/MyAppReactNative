import express from 'express';
import upload from '../config/multer'; // Import multer configuration
import { updateProfile } from '../controllers/userController';

const router = express.Router();

router.put('/profile/:id', upload.single('profileImage'), updateProfile);

export default router;
