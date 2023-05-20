const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const error = require("../utils/errors");

module.exports.authorization = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    res.status(error.UNAUTHORIZED).send("Authorization Error");
    return;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
  return next();
};
