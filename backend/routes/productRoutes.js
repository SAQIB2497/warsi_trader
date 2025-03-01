import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { authMiddleware, adminMiddleware } from '../midlewares/authMiddleware.js';

const router = express.Router();

router.post('/createproduct', authMiddleware, adminMiddleware, createProduct);
router.get('/allproducts', getProducts); 
router.get('/:id', getProductById); 
router.put('/updateproduct/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/deleteproduct/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;
