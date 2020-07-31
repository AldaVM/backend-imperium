if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}
interface Config{
  MONGO_URI:string;
  APPLICATION_NAME:string;
  JWT_SECRET:string;
  EXPIRES_IN:string
}

const config:Config = {
  MONGO_URI: String(process.env.MONGO_URI),
  APPLICATION_NAME: String(process.env.APPLICATION_NAME),
  JWT_SECRET:String(process.env.JWT_SECRET),
  EXPIRES_IN:String(process.env.EXPIRES_IN)
}

export default config;
