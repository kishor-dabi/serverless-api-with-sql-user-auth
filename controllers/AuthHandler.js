const bcrypt = require('bcrypt');
const models = require('../database/models');
const { getUserById, login } = require('../services/user.service');
const { generateToken } = require('../utils/helpers');
const saltRounds = 10

/* 
 * Functions
 */

module.exports.login = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    let body = JSON.parse(event.body)

    return await login(body).then(session => ({
      statusCode: 200,
      body: JSON.stringify(session)
    }))
      .catch(err => ({
        statusCode: err.statusCode || 400,
        body: JSON.stringify({ stack: err.stack, message: err.message })
      }));
  } catch (error) {
    console.log(error);
    return {
      statusCode: err.statusCode || 500,
      body: { stack: err.stack, message: err.message }
    }
  }
};

module.exports.register = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {

    let body = JSON.parse(event.body)

    const existing = await models.users.findOne({ where: { email: body.email } }) // check if user exists
    if (existing) return {
      statusCode: 200,
      body: JSON.stringify({ message: "user exist" })
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    let hash = await bcrypt.hashSync(body.password, salt)
    let user = await models.users.create({ ...body, password: hash })
    return {
      statusCode: 200,
      body: JSON.stringify({ auth: true, token: generateToken(JSON.parse(JSON.stringify(user))) })
    }

  } catch (error) {
    console.log(error);
    return error
  }

};

module.exports.userDetails = async (event, context) => {

  try {
    return await getUserById(event.requestContext.authorizer.principalId).then(session => ({
      statusCode: 200,
      body: JSON.stringify(session)
    }))
      .catch(err => ({
        statusCode: err.statusCode || 400,
        body: JSON.stringify({ stack: err.stack, message: err.message })
      }));

  } catch (error) {
    console.log(error);
    return {
      statusCode: err.statusCode || 500,
      body: { stack: err.stack, message: err.message }
    }
  }

  // context.callbackWaitsForEmptyEventLoop = false;
  // return connectToDatabase()
  //   .then(() =>
  //     me(event.requestContext.authorizer.principalId)
  //   )
  //   .then(session => ({
  //     statusCode: 200,
  //     body: JSON.stringify(session)
  //   }))
  //   .catch(err => ({
  //     statusCode: err.statusCode || 500,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: { stack: err.stack, message: err.message }
  //   }));
};

/**
 * Helpers
 */

// function signToken(id) {
//   return jwt.sign({ id: id }, process.env.JWT_SECRET, {
//     expiresIn: 86400 // expires in 24 hours
//   });
// }

function checkIfInputIsValid(eventBody) {
  if (
    !(eventBody.password &&
      eventBody.password.length >= 7)
  ) {
    return Promise.reject(new Error('Password error. Password needs to be longer than 8 characters.'));
  }

  if (
    !(eventBody.name &&
      eventBody.name.length > 5 &&
      typeof eventBody.name === 'string')
  ) return Promise.reject(new Error('Username error. Username needs to longer than 5 characters'));

  if (
    !(eventBody.email &&
      typeof eventBody.name === 'string')
  ) return Promise.reject(new Error('Email error. Email must have valid characters.'));

  return Promise.resolve();
}
