const express = require('express');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

router.get('/', bookingController.getAllBooking);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.get('/user/:id', bookingController.getBookingByUserId);
router.get('/field/:id', bookingController.getBookingByFieldId);
router.put('/:id', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;