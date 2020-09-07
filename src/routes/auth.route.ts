import { Router } from 'express';
import { authController } from '../controllers';
import { handleCatchPromise } from "../middlewares";

const router = Router();

router.route('/signin').post(handleCatchPromise(authController.signin));
router.route('/signup').post(handleCatchPromise(authController.signup));

export default router;