import app from "./app";
import config from "../config/index";

export default function () {
  app.listen(app.get("port"));
  console.log(`${config.APPLICATION_NAME} App Run ${app.get("port")}`);
}
