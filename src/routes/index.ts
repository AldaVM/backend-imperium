import { Router } from "express";
import { HelpRouter, CustomerRouter, TimetableRouter } from "./index.route";

const router = Router();

router.use("/help", HelpRouter);
router.use("/customer", CustomerRouter);
router.use("/timetable", TimetableRouter);

export default router;
