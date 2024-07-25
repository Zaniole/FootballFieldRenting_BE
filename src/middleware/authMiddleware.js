const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) =>{
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: err,
                status: 'ERROR'
            })
        } else {
            const { payload } = user;
            if(payload?.isAdmin){
                next();
            }
            else {
                return res.status(404).json({
                    message: "Authentication",
                    status: 'ERROR'
                })
            }
        }
    })
}

const authUserMiddleware = (req, res, next) =>{
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: err,
                status: 'ERROR'
            })
        } else {
            const { payload } = user;
            const userId = req.params.id
            if(payload?.isAdmin || (payload?.id === userId )){
                next();
            }
            else {
                return res.status(404).json({
                    message: "Authentication",
                    status: 'ERROR'
                })
            }
        }
    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}