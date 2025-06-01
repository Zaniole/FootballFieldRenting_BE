const FieldService = require('../services/fieldService.service')

const createService = async (req, res) => {
	try {
		const data = req.body;
		const response = await FieldService.createService(data);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const getAllService = async (req, res) => {
	try {
		const response = await FieldService.getAllService();
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const getServiceById = async (req, res) => {
	try {
		const serviceId = req.params.id;
		const response = await FieldService.getServiceById(serviceId);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const deleteServiceById = async (req, res) => {
	try {
		const serviceId = req.params.id;
		const response = await FieldService.deleteServiceById(serviceId);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	createService,
	getAllService,
	getServiceById,
	deleteServiceById
}