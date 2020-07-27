if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

export default {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  APPLICATION_NAME: process.env.APPLICATION_NAME,
}
