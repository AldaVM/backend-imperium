import { customerController } from "../controllers";
import { handleCatchPromise } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("", handleCatchPromise(customerController.find));
router.get("/:id", handleCatchPromise(customerController.findById));
//Cambiar a get, se hizo prubea para enviar datos en body
router.post("/find_by_dni", handleCatchPromise(customerController.findByItems));
router.post("", handleCatchPromise(customerController.create));
router.put("/:id", handleCatchPromise(customerController.update));
router.delete("/:id", handleCatchPromise(customerController.delete));

export default router;
