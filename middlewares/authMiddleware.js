const { toData } = require("../auth/jwt");
const User = require("../models").user;
const authMiddleware = (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const theOne = User.findByPk(data.userId);
      !theOne && res.status(404).send("User not Found!");
      req.user = theOne;
      next();
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
};
module.exports = authMiddleware;
