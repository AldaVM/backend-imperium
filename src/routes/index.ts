import { Router} from "express"
import {HelpRouter} from "./index.route"

const router = Router()

router.use("/help", HelpRouter)

export default router