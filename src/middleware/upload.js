const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true); // Accept file
	} else {
		cb(new Error('Chỉ cho phép các định dạng ảnh: JPG, JPEG, PNG, WEBP'), false);
	}
};

const upload = multer({ 
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024 // Giới hạn kích thước ảnh 5MB 
	}
 });

module.exports = upload;
