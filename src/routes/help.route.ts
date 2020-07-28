import { HelpController } from "../controllers";
import { Router } from "express";

const router = Router();

router.get("", HelpController.get);

export default router;
