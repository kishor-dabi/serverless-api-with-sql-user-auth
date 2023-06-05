const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
}

const generateErrorResponse = (data) =>{
    return {
        error: true,
        data
    }
}

const successResponse = (data) =>{ return {data}}

module.exports = {
    generateToken,
    generateErrorResponse,
    successResponse
}