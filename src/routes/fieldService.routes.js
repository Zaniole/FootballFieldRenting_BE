const express = require('express');
const router =  express.Router();
const FieldServiceController = require('../controllers/fieldService.controller');

router.post('/', FieldServiceController.createService);
router.get('/', FieldServiceController.getAllService);
router.get('/:id', FieldServiceController.getServiceById);
router.delete('/:id', FieldServiceController.deleteServiceById);

module.exports = router;

