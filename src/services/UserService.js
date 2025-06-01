const User = require("../models/user.model");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, phone, password, role } = newUser;
        try {
            const checkUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });

            if (checkUser) {
                if (checkUser.email === email) {
                   return resolve({
                        status: 'ERROR',
                        message: 'Email already exists'
                    })
                } else if (checkUser.phone === phone) {
                   return resolve({
                        status: 'ERROR',
                        message: 'Phone number already exists'
                    })
                }
            }

            const createdUser = await User.create({
                name,
                email,
                phone,
                password,
                role
            })

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW USER SUCCESSFULLY',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (user) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = user;
        try {
            const checkUser = await User.findOne({
                 email: email 
            });
            if(checkUser === null){
                resolve({
                    status: 'ERROR',
                    message: 'THE USER IS UNDEFINED',
                })
            }

            const checkPassword = (checkUser.password === password);
            if(!checkPassword){
                resolve({
                    status: 'ERROR',
                    message: 'WRONG EMAIL OR PASSWORD',
                })
            }

            const accessToken = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refreshToken = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            
            resolve({
                status: 'OK',
                message: 'Log in success',
                accessToken,
                refreshToken
            })

        } catch (error) {
            reject(error);
        }
    })
}

const updateUser = (id, data) =>{
    return new Promise(async (resolve, reject) => {
        try {
            const findUser = await User.findOne({
                _id: id
            })
            if(!findUser){
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }
            
            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});

            resolve({
                status: 'OK',
                message: 'Update user successfully',
                data: updatedUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findUser = await User.findOne({
                _id: id
            })

            if(!findUser){
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }
            
            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete user successfully'
            })

        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: 'Get all users successfully',
                data: allUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if(user === null){
               return resolve({
                    status: 'ERROR',
                    message: 'User is not found'
                })
            }

            resolve({
                status: 'OK',
                message: 'success',
                data: user
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}