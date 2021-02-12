import { voucherController } from "../controllers";
import {
  handleCatchPromise,
  roleMiddleware,
  authMidlleware,
} from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(voucherController.find));
router.get("/:id", handleCatchPromise(voucherController.findById));
router.get(
  "/generate-pdf/:id",
  handleCatchPromise(voucherController.genereteVocuherPDF)
);
router.post("", handleCatchPromise(voucherController.registerVoucher));
router.put("/:id", handleCatchPromise(voucherController.update));
router.delete(
  "/:id",
  [authMidlleware, roleMiddleware],
  handleCatchPromise(voucherController.delete)
);
router.post(
  "/find_property",
  handleCatchPromise(voucherController.findByItemsPagination)
);
export default router;
