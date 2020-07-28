if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const config = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/imperium-register',
  APPLICATION_NAME: process.env.APPLICATION_NAME,
}

export default config
