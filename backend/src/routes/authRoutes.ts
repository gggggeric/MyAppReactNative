import { Router, Request, Response } from 'express'; 
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    console.log('Request received at /register:', req.body);
  await registerUser(req, res); 
});

router.post('/login', async (req: Request, res: Response) => {
  await loginUser(req, res); 
});

export default router;
