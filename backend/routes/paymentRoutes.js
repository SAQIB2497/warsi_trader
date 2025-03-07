import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = express.Router();

// Define payment route
router.post('/create-payment-intent', createPaymentIntent);

export default router;
