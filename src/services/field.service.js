const Field = require('../models/field.model');
const dayjs = require('dayjs');
const { uploadToCloudinary } = require('../services/cloudinary.service')

const getAllField = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allField = await Field.find();

			resolve({
				status: 'OK',
				message: 'Get all Field successfully',
				data: allField
			})
		} catch (error) {
			reject(error);
		}
	})

}

const createField = (fieldData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const {
				owner,
				name,
				address,
				subField,
				service,
				image,
				price,
				goldPrice,
				openTime,
				description
			} = fieldData;
			console.log('fieldData: ', fieldData)
			console.log('image: ', image)

			// check open time
			const start = dayjs(`1970-01-01T${openTime.startAt}`); // dùng 01-01-1970 làm ngày giả định, chỉ quan tâm đến giờ
			const close = dayjs(`1970-01-01T${openTime.closeAt}`);
			if (!close.isAfter(start)) {
				return resolve({
					status: "ERROR",
					message: "Close time must be after start time"
				})
			}

			let imageUrl = ' ';
			if (image?.buffer) {
				imageUrl = await uploadToCloudinary(image.buffer, 'fields')
			}

			const newField = await Field.create({
				owner,
				name,
				address,
				subField,
				service,
				image: imageUrl,
				price,
				goldPrice,
				openTime,
				description
			});

			if (newField) {
				resolve({
					status: 'OK',
					message: 'Create new field successfully',
					data: newField
				})
			}
		} catch (error) {
			reject(error);
		}
	})
};

const getFieldById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const field = await Field.findById(id);

			if(field === null){
				return resolve({
					status: 'ERROR',
					message: 'Field is not found'
				})
			}

			resolve({
				status: 'OK',
				message: 'Get field successfully',
				data: field
			})
		} catch (error) {
			reject(error);
		}
	})
}

const getFieldByUserId = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const fields = await Field.find({ owner: userId });

			resolve({
				status: 'OK',
				message: 'Get fields successfully',
				data: fields
			})
		} catch (error) {
			reject(error);
		}
	})
}

const updateFieldById = (id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkField = await Field.findById(id);
			if (!checkField) {
				resolve({
					status: 'ERROR',
					message: 'Field is not found'
				})
			}

			const updatedField = await Field.findByIdAndUpdate(id, data, {
				new: true
			})
			resolve({
				status: 'OK',
				message: 'Update field successfully',
				data: updatedField
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	createField,
	getAllField,
	getFieldById,
	getFieldByUserId,
	updateFieldById
};