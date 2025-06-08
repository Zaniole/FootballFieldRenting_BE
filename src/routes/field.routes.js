const express = require('express');
const router =  express.Router();
const multer = require('multer')
const FieldController = require('../controllers/field.controller');
const upload = require('../middleware/upload')
const parseJsonFields = require('../middleware/parseJsonFields')

router.get('/', FieldController.getAllField);
router.post(
	'/', 
	upload.single('image'), 
	parseJsonFields(['openTime', 'service']),
	(err, req, res, next) => {
		if (err instanceof multer.MulterError || err.message.includes('định dạng')) {
			return res.status(400).json({ message: err.message });
		}
		next();
	},
	FieldController.createField);
router.get('/:id', FieldController.getFieldById);
router.put('/:id', FieldController.updateFieldById);
router.get('/user/:id', FieldController.getFieldByUserId);

module.exports = router