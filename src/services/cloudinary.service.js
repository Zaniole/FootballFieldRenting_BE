const cloudinary = require('../utils/cloudinary')
const streamifier = require('streamifier')

const uploadToCloudinary = (buffer, folder = 'default') => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ folder },
			(error, result) => {
				if (error) return reject(error);
				resolve(result.secure_url);
			}
		);
		streamifier.createReadStream(buffer).pipe(stream);
	});
};

module.exports = {
	uploadToCloudinary
};
