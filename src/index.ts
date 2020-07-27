import startServer from "./startup";
import config from "./config";
import mongoose from "mongoose";

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => startServer())
  .catch(console.error);
