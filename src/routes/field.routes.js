const express = require('express');
const router =  express.Router();
const FieldController = require('../controllers/field.controller');

router.get('/', FieldController.getAllField);
router.post('/', FieldController.createField);
router.get('/:id', FieldController.getFieldById);
router.put('/:id', FieldController.updateFieldById);
router.get('/user/:id', FieldController.getFieldByUserId);

module.exports = router