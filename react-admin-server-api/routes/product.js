import express from 'express';
import {addProduct,getProduct,getCustomerProduct,deleteProduct} from '../controllers/productController.js'

const router = express.Router();

router.post("/addProduct", addProduct)
router.get("/getProduct", getProduct)
router.get("/singleProduct", getCustomerProduct)
router.delete("/deleteProduct/:id", deleteProduct)

export default router;