const Service = require('../models/fieldService.model');

const createService = (serviceName) => {
	return new Promise(async (resolve, reject) => {
		try {
			const newService = await Service.create(serviceName);
			if (newService) {
				resolve({
					status: "OK",
					message: "Create new service successfully",
					data: newService
				})
			}
		} catch (error) {
			reject(error);
		}
	})
}

const getAllService = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allService = await Service.find();

			resolve({
				status: "OK",
				message: "Get all services successfully",
				data: allService
			})
		} catch (error) {
			reject(error);
		}
	})
}

const getServiceById = (serviceId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkService = await Service.findById(serviceId);
			if (!checkService) {
				resolve({
					status: "ERROR",
					message: "Service is not found"
				})
			}

			resolve({
				status: "OK",
				message: "Get service successfully",
				data: checkService
			})
		} catch (error) {
			reject(error);
		}
	})
}

const deleteServiceById = (serviceId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkService = await Service.findById(serviceId);
			if (!checkService) {
				resolve({
					status: "ERROR",
					message: "Service is not found"
				})
			}

			await Service.findByIdAndDelete(serviceId);

			resolve({
				status: "OK",
				message: "Delete service successfully"
			})
		} catch (error) {
			reject(error);
		}
	})
}

module.exports = {
	createService,
	getAllService,
	getServiceById,
	deleteServiceById
}