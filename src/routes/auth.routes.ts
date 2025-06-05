import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);

export default router;
