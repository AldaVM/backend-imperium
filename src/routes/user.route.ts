import { Router } from 'express';
import { userController } from '../controllers';
import { authMidlleware, roleMiddleware, handleCatchPromise } from '../middlewares';

const router = Router();

router.route('/').get([authMidlleware, roleMiddleware], handleCatchPromise(userController.find));
router.route('/:id').get(handleCatchPromise(userController.findById));
router.route('/:id').put(handleCatchPromise(userController.update));
router.route('/:id').delete(handleCatchPromise(userController.delete));


export default router;