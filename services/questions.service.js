const models = require('../database/models');
const { generateErrorResponse, successResponse } = require('../utils/helpers');

const createQuestion = async(data)=>{

    if (!data.quiz_id) {
        return generateErrorResponse ({message: 'quiz_id required'})
    }
    let quiz = await models.quiz.findOne({where:{id:data.quiz_id}})
    if (!quiz) {
        return generateErrorResponse ({message: 'invalid quiz_id. '})
    }
    const questionCount = await models.questions.count({where:{quiz_id:data.quiz_id}}) 
    if (questionCount >= quiz.number_of_questions) {
        return generateErrorResponse ({message: `already have ${questionCount}, can't create more question for ${quiz.name}`})
    }
    const quizObj = await models.questions.create({...data}) 
    return successResponse(quizObj)

}

const getQuestion = async(id)=>{
    const quiz = await models.questions.findAll({
        // include:['questions']
    }) 
    return quiz

}


module.exports = {
    createQuestion,
    getQuestion
}