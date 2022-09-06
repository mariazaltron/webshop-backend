const { Router } = require("express");
const Category = require("../models").category;
const router = new Router();

router.get("/", async (req, res, next) => {
  const products = await Category.findAll();
  res.send(products);
});

module.exports = router;
