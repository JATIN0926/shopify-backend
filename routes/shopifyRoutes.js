const express = require("express");
const router = express.Router();
const { AddProduct } = require("../controllers/shopifyController");


router.post("/add-products", AddProduct);

module.exports = router;
