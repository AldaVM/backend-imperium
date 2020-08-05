import { Router } from 'express';
import { authController } from '../controllers';

const router=Router();

router.route('/signin').post(authController.signin);
router.route('/signup').post(authController.signup);

export default router;