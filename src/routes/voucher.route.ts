import { voucherController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(voucherController.find));
router.post("", handleCatchPromise(voucherController.registerVoucher));
router.put("/:id", handleCatchPromise(voucherController.update));

export default router;
