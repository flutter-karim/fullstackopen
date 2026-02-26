const router = require("express").Router();
const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET,
      );
      return next();
    } catch (err) {
      return res.status(401).json({ error: ["token invalid"] });
    }
  }

  return res.status(401).json({ error: ["token missing"] });
};

module.exports = tokenExtractor;
