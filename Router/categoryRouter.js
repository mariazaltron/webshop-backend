const { Router } = require("express");
const Category = require("../models").category;
const router = new Router();

router.get("/", async (req, res, next) => {
  const products = await Category.findAll();
  res.send(products);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const categoryById = await Category.findByPk(id);
    !categoryById && res.status(404).send("Category not found");
    res.send(categoryById);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
