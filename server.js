const express = require("express");
const cors = require("cors");
const productRouter = require("./Router/productRouter");

const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);


app.listen(port, () => console.log(`listening on port ${port}`))   