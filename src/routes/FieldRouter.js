const express = require('express');
const router =  express.Router();
const FieldController = require('../controllers/FieldController');

router.post('/create', FieldController.createField);



module.exports = router