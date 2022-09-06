const { Router } = require("express");
const Product = require("../models").product
const router = new Router();


router.get("/", async (req, res, next) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    
    try {
        
        const products = await Product.findAll( {limit, offset} );
        res.send(products);
    } catch (error) {
        next(error)
        
    }
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
