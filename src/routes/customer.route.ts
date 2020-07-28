import { customerController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(customerController.find));
router.get("/:id", handleCatchPromise(customerController.findById));
router.post("", handleCatchPromise(customerController.create));
router.put("/:id", handleCatchPromise(customerController.update));
router.delete("/:id", handleCatchPromise(customerController.delete));

export default router;
