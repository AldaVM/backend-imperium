import { Router } from "express";
import {
  HelpRouter,
  CustomerRouter,
  UserRouter,
  AuthRouter,
  TimetableRouter,
  RangeHoursRouter,
  ParameterRouter,
} from "./index.route";

const router = Router();

router.use("/help", HelpRouter);
router.use("/customer", CustomerRouter);
router.use("/parameter", ParameterRouter);
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/timetable", TimetableRouter);
router.use("/rangehours", RangeHoursRouter);

export default router;
