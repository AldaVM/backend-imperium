import { rangeHoursController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(rangeHoursController.find));
router.get("/:id", handleCatchPromise(rangeHoursController.findById));
router.post("", handleCatchPromise(rangeHoursController.create));
router.put("/:id", handleCatchPromise(rangeHoursController.update));
router.delete("/:id", handleCatchPromise(rangeHoursController.delete));

export default router;
