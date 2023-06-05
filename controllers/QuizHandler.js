const { createQuize, getQuizeList, startQuiz, saveUserQuizAnswer } = require("../services/quiz.service");

module.exports.createQuiz = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        let body = JSON.parse(event.body)

        let data = await createQuize(body)

        return {
            statusCode: 200,
            body: JSON.stringify({ data })
        }

    } catch (error) {
        console.log(error);
        return error
    }

};

module.exports.getQuiz = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        let body = JSON.parse(event.body)

        let data = await getQuizeList()

        return {
            statusCode: 200,
            body: JSON.stringify({ data })
        }

    } catch (error) {
        console.log(error);
        return error
    }

};


module.exports.startQuiz = async (event, context) => {

    const { id } = event.pathParameters;
    try {

        let body = JSON.parse(event.body)

        let data = await startQuiz(event.requestContext.authorizer.principalId, id)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }

    } catch (error) {
        console.log(error);
        return error
    }

};

module.exports.saveQuizAnswer = async (event, context) => {

    try {

        let body = JSON.parse(event.body)

        let data = await saveUserQuizAnswer({...body, user_id:event.requestContext.authorizer.principalId})

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }

    } catch (error) {
        console.log(error);
        return error
    }

};