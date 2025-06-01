const FieldService = require('../services/field.service');

const getAllField = async (req, res) => {
    try {
        const fields = await FieldService.getAllField();
        return res.status(201).json(fields);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createField = async (req, res) => {
    try {
        const newField = await FieldService.createField(req.body);
		return res.status(201).json(newField);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getFieldById = async (req, res) => {
    try {
        const fieldId = req.params.id;
        const field = await FieldService.getFieldById(fieldId);
        return res.status(201).json(field);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getFieldByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const field = await FieldService.getFieldByUserId(userId);
        return res.status(201).json(field);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateFieldById = async (req, res) => {
    try {
        const fieldId = req.params.id;
        const updatedField = await FieldService.updateFieldById(fieldId, req.body);
        return res.status(201).json(updatedField)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createField,
    getAllField,
    getFieldById,
    getFieldByUserId,
    updateFieldById
}