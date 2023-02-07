import express from 'express';
import {addProducts,getProducts,getCustomerProducts,deleteProducts} from '../controllers/orderController.js'

const router = express.Router();

router.post("/add-product", addProducts)
router.get("/get-product", getProducts)
router.get("/singleUserProduct", getCustomerProducts)
router.delete("/delete-product/:id", deleteProducts)

export default router;