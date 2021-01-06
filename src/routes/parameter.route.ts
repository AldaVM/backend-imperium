import { parameterController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(parameterController.find));
router.post("", handleCatchPromise(parameterController.create));

export default router;
