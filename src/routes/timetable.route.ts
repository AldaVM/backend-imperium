import { timetableController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(timetableController.find));
router.get("/:id", handleCatchPromise(timetableController.findById));
//Cambiar a get, se hizo prubea para enviar datos en body
router.post("/shift_available", handleCatchPromise(timetableController.findByItems));
router.post("", handleCatchPromise(timetableController.create));
router.put("/:id", handleCatchPromise(timetableController.update));
router.delete("/:id", handleCatchPromise(timetableController.delete));

export default router;
