const FieldService = require('../services/FieldService');

const createField = async (req, res) => {
    try {
         
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createField
}