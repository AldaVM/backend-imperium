import { Router } from 'express';
import { userController } from '../controllers';
import { authMidlleware, roleMiddleware } from '../middlewares';

const router = Router();

router.route('/').get([authMidlleware, roleMiddleware], userController.find);
router.route('/:id').get(userController.findById);
router.route('/:id').put(userController.update);
router.route('/:id').delete(userController.delete);


export default router;