const models = require('../database/models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/helpers');
const saltRounds = 10

const getUsers = async() =>{
    const users = await models.users.findAll()
    if (users) {
      return { user: users }
    } else {
      return { user: null }
    }
  
  }

  
const getUserById = async (userId) => {

    const existing = await models.users.findOne({ where: { id: userId } })
    // .then(user=>{
    //   user
    // }).catch(err => Promise.reject(new Error(err)));
    if (existing) {
      return { user: existing }
    } else {
      return { user: null }
    }
  
  }

  
const login =  async (eventBody) => {

    const existing = await models.users.findOne({ where: { email: eventBody.email } }) // check if user exists
    if (!existing) return {
      statusCode: 200,
      body: JSON.stringify({ message: "user does not exist." })
    }
  
    let validatePassword = await comparePassword(eventBody.password, existing.password, existing)
  
    return { auth: true, accessToken: validatePassword, refreshToken: "", user:existing }
  }
  
  function comparePassword(eventPassword, userPassword, user) {
    return bcrypt.compare(eventPassword, userPassword)
      .then(passwordIsValid =>
        !passwordIsValid
          ? Promise.reject({ message: 'The credentials do not match.' })
          : generateToken(JSON.parse(JSON.stringify(user)))
      );
  }
  

  module.exports = {
    getUsers,
    getUserById,
    login
  }