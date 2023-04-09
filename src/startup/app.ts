import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../routes";

import { errorGeneric, routeNoFound } from "../middlewares";
const app = express();

//Settings:
app.set("port", process.env.PORT || 8000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Settings entorn development:
if (process.env.NODE_ENV != "production") {
  const logger = require("morgan");
  app.use(logger("dev"));
}

//Routes
app.use("/v1/api", routes);

//Middleware
app.use(routeNoFound);
app.use(errorGeneric);

export default app;
