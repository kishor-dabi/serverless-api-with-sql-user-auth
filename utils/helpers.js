const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
}

module.exports = {
    generateToken
}