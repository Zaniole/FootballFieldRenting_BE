const UserSevice = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req,res) => {
    try {
        const response = await UserSevice.createUser(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const response = await UserSevice.loginUser(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if(!userId){
            return res.status(200).json({
                status: 'ERROR',
                message: 'user id is required'
            })
        }

        const response = await UserSevice.updateUser(userId, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if(!userId){
            return res.status(200).json({
                status: 'ERROR',
                message: 'user id is required'
            })
        }

        const response = await UserSevice.deleteUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req,res) => {
    try {
        const response = await UserSevice.getAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if(!userId){
            return res.status(200).json({
                status: 'ERROR',
                message: 'user id is required'
            })
        }

        const response = await UserSevice.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];
        if(!token){
            return res.status(200).json({
                status: 'ERROR',
                message: 'Token is required'
            })
        }

        const response = await JwtService.refreshTokenJWTService(token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}