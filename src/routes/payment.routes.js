const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/:id', paymentController.getPaymentByBookingId)
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePaymentStatus);
router.delete('/:id', paymentController.cancelPayment);
router.post('/zalopay/', paymentController.createTransactionZaloPay);
router.post('/zalopay/callback', paymentController.handleCallback);

module.exports = router;