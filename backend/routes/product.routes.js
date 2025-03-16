import expess from "express";
import { addProduct, deleteProduct, getProducts, updateProducts } from "../controllers/product.controller.js";

const router = expess.Router();

router.post('/', addProduct)
router.delete('/:id', deleteProduct)
router.get("/", getProducts)
router.put("/:id", updateProducts)

export default router;