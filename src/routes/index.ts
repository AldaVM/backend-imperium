import { Router } from "express";
import { HelpRouter, CustomerRouter } from "./index.route";

const router = Router();

router.use("/help", HelpRouter);
router.use("/customer", CustomerRouter);

export default router;
