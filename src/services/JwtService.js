const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h' })
    return accessToken;
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d' })
    return refreshToken;
}

const refreshTokenJWTService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) =>{
                if(err) {
                    resolve({
                        status: 'ERROR',
                        message: 'Authentication'
                    })
                }
                const { payload } = user;
                const newAccessToken = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                });
                
                resolve({
                    status: 'OK',
                    message: 'Success',
                    accessToken: newAccessToken
                }) 
            } )
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJWTService
}