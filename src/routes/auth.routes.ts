import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { LIMIT_TYPES, rateLimits } from '../middlewares/rateLimits';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import { Permissions } from '../config/roles';

const router = Router();

router.post('/register', rateLimits(LIMIT_TYPES.REGISTER), validate(registerSchema), registerUser);
router.post('/login', rateLimits(LIMIT_TYPES.LOGIN), validate(loginSchema), loginUser);
router.post('/logout', rateLimits(LIMIT_TYPES.GENERAL), isAuthenticated, isAuthorized([Permissions.ALLOW_ALL]), logoutUser);

export default router;
