import express from "express";
import { addToCart, getCart, updateCart, removeFromCart } from "../controllers/cartController.js";
import { authMiddleware } from "../midlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);

export default router;
