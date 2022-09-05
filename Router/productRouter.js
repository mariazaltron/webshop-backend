const { Router } = require("express");
const Product = require("../models").product
const router = new Router();


router.get("/", async (req, res, next) => {
    const products = await Product.findAll();
    res.send(products)
})

router.get("/:id", async (req, res, next) => {
    const {id}=req.params
    try {
        const productById = await Product.findByPk(id);
        !productById && res.status(404).send("Product not found")
        res.send(productById);
    } catch (error) {
        next(error)
    }
    
});















module.exports = router
