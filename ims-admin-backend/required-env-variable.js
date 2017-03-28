module.exports = function requiredEnvVariable(variableName, defaultValue) {
  if (process.env.NODE_ENV === "production" && !process.env[variableName]) {
    throw new Error("Environment variable " + variableName + " is required in production mode");
  }
  return process.env[variableName] || defaultValue;
};