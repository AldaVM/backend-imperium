import { timetableController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(timetableController.find));
router.get("/:id", handleCatchPromise(timetableController.findById));
router.get(
  "/shift_available/all_days",
  handleCatchPromise(timetableController.getTimetableAllDays)
);
//Cambiar a get, se hizo prubea para enviar datos en body
router.post(
  "/shift_available",
  handleCatchPromise(timetableController.findShiftsAvailable)
);
router.post("", handleCatchPromise(timetableController.create));
router.put("/:id", handleCatchPromise(timetableController.update));
router.put(
  "/add_customer/all-days",
  handleCatchPromise(timetableController.addCustomerInDiaryTurn)
);
router.put(
  "/add_customer/:id",
  handleCatchPromise(timetableController.addCustomer)
);


router.post(
  "/delete_customer/:id",
  handleCatchPromise(timetableController.deleteCustomer)
);
router.delete("/:id", handleCatchPromise(timetableController.delete));

export default router;
