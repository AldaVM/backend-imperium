import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

//Settings:
app.set("port", process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Settings entorn development:
if (process.env.NODE_ENV != "production") {
  const logger = require("morgan");
  app.use(logger("dev"));
}

//Routes


//Middleware



export default app;
