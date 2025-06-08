// middlewares/parseJsonFields.js
module.exports = function parseJsonFields(fields = []) {
	return function (req, res, next) {
		for (const field of fields) {
			if (typeof req.body[field] === 'string') {
				try {
					req.body[field] = JSON.parse(req.body[field]);
				} catch (err) {
					return res.status(400).json({
						status: 'ERROR',
						message: `Invalid JSON format in field: ${field}`
					});
				}
			}
		}
		next();
	}
}
