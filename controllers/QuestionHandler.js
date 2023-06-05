const { getQuestion, createQuestion } = require("../services/questions.service");

module.exports.createQuestion = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    try {
  
      
      let body = JSON.parse(event.body)
  
      let data = await createQuestion(body)

      return {
        statusCode: data.error ? 400 : 200,
        body: JSON.stringify(data.data)
      }
  
    } catch (error) {
      console.log(error);
      return error
    }
  
  };

// module.exports.getQuestion = async (event, context) => {
  // const { id } = event.pathParameters;
  // event.queryStringParameters.[parameter name] // queryparams
  
//     try {
  
//       let body = JSON.parse(event.body)
  
//       let data = await getQuestion()

//       return {
//         statusCode: 200,
//         body: JSON.stringify({ data})
//       }
  
//     } catch (error) {
//       console.log(error);
//       return error
//     }
  
//   };