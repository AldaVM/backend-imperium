import { customerController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(customerController.find));
router.get(
  "/download_xlsx",
  handleCatchPromise(customerController.downloadExcel)
);
router.get("/:id", handleCatchPromise(customerController.findById));
router.get(
  "/find_by_dni/:dni",
  handleCatchPromise(customerController.validateShiftByDNI)
);
router.post(
  "/find_property",
  handleCatchPromise(customerController.findByItems)
);
router.post("", handleCatchPromise(customerController.create));
router.put("/:id", handleCatchPromise(customerController.update));
router.put(
  "/delete_timetable/:id",
  handleCatchPromise(customerController.deleteTimetable)
);
router.delete("/:id", handleCatchPromise(customerController.delete));

export default router;
