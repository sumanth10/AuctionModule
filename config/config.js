const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  MONGODB_SERVICE_HOST: Joi.string().required().description("Mongo host url"),
  MONGODB_SERVICE_PORT: Joi.number().default(27017),
  MONGODB_DATABASE: Joi.string().required().description("Mongo DB name"),
  MONGODB_USER: Joi.string().when("NODE_ENV", {
    is: Joi.string().equal("production"),
    then: Joi.string().required().description("Mongo user name"),
    otherwise: Joi.string().default(""),
  }),
  MONGODB_PASSWORD: Joi.string().when("NODE_ENV", {
    is: Joi.string().equal("production"),
    then: Joi.string().required().description("Mongo user name"),
    otherwise: Joi.string().default(""),
  })
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGODB_SERVICE_HOST,
    port: envVars.MONGODB_SERVICE_PORT,
    db: envVars.MONGODB_DATABASE,
    username: envVars.MONGODB_USER,
    password: envVars.MONGODB_PASSWORD,
  },
  razorpay: {
    key: envVars.RAZORPAY_KEY,
    secret: envVars.RAZORPAY_SECRET,
  },
};

module.exports = config;
