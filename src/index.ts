import startServer from "./startup";
import config from "./config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    startServer();
  })
  .catch(console.error);
