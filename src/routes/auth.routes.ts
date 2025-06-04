import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', validate(registerSchema), logoutUser);

export default router;
