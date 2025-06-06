const ZaloPayment = require('../models/zalopayment.model');

const createZaloPayment = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { paymentId, zp_trans_id, amount } = data;

			const newZaloPayment = await ZaloPayment.create({
				zp_trans_id: zp_trans_id,
				payment: paymentId,
				amount: amount
			})

			if (newZaloPayment) {
				resolve({
					status: 'OK',
					message: 'Create new zalopayment successfully',
					data: newZaloPayment
				})
			}

		} catch (error) {
			reject(error);
		}
	})
}

module.exports = {
	createZaloPayment
}
