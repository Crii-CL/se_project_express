const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const error = require("../utils/errors");

module.exports.authorization = (req, res, next) => {
  console.log(req.headers, "headers");
  const { authorization } = req.headers;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    const err = new Error("Authorization Error");
    err.statusCode = error.UNAUTHORIZED;
    err.name = "Unauthorized";
    throw err;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
