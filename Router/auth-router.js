const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const { toJwt } = require("../auth/jwt");

const router = new Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name || password.length < 6) {
      res.status(500).end();
    }
    const newUser = await User.create({
      email,
      name,
      password: bcrypt.hashSync(password, 10),
    });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .send({ message: "please provide a valid email or password" });
  } else {
    const user = await User.findOne({ where: { email: email } });
    !user && res.status(404).send("Valid email or password required!");
    const valid = bcrypt.compareSync(password, user.password);
    !valid && res.status(404).send("Valid email or password required!");
    res.send(toJwt({ userId: user.id }));
  }
});

module.exports = router;
