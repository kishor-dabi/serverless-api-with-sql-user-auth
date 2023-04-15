const { getUsers } = require('../services/user.service');

/**
 * Functions
 */

module.exports.getUsers = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    
    return await getUsers().then(users => ({
      statusCode: 200,
      body: JSON.stringify(users)
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
