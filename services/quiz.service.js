const models = require('../database/models');
const { successResponse } = require('../utils/helpers');

const createQuize = async (data) => {
    const quiz = await models.quiz.create({ ...data })

    return quiz

}

const getQuizeList = async () => {
    const quiz = await models.quiz.findAll({
        include: ['questions']
    })

    return quiz

}

const startQuiz = async (user_id, quiz_id) => {

    const quiz = await models.quiz.findOne({
        where: { id: quiz_id },
        include: ['questions']
    });

    if (!quiz) {
        return generateErrorResponse({ message: 'invalid quiz_id. ' })
    }

    let existingQuiz = await models.user_quiz.findAll({
        where: {
            user_id,
            is_completed: false,
            quiz_id
        }
    })
    if (existingQuiz && existingQuiz.length) {
        let pendingQuiz = JSON.parse(JSON.stringify(existingQuiz))
        console.log('pending quiz ::', JSON.parse(JSON.stringify(existingQuiz)));
        let response = {
            user_quiz: pendingQuiz[0]
        }
        if (pendingQuiz[0].attempt_question_id) {
            let attempt_question = JSON.parse(pendingQuiz[0].attempt_question_id);
            console.log({attempt_question});
            for (const iterator of quiz.questions) {
                if (attempt_question.indexOf(iterator.id) == -1) {
                    response.current_question = iterator;
                    break;
                }
            }
        }else{
            response.current_question = quiz.questions[0];
        }
        return successResponse(response);

    } else {
        let user_quiz = await models.user_quiz.create({
            user_id,
            quiz_id,
            time: 0,
        })

        let response = {
            user_quiz
        }
        if (quiz.questions && quiz.questions.length) {
            response.current_question = quiz.questions[0]
        }

        return successResponse(response)
    }
}

const saveUserQuizAnswer = async({user_id, quiz_id, question_id, answer, time, user_quiz})=>{

    let userQuiz = await models.user_quiz.findOne({where:{id:user_quiz.id}})
    let quiz = await models.quiz.findOne({
        where: { id: quiz_id },
        include: ['questions']
    });
    quiz = JSON.parse(JSON.stringify(quiz))
    console.log(quiz);
    let attempt_question_id = []
    if(userQuiz.attempt_question_id) attempt_question_id = JSON.parse(userQuiz.attempt_question_id); 

    let attempt_question_answer = []
    if(userQuiz.attempt_question_answer) attempt_question_answer = JSON.parse(userQuiz.attempt_question_answer); 

    attempt_question_id.push(question_id)
    attempt_question_answer.push(answer);

    let marks = userQuiz.marks;
    for (const iterator of quiz.questions) {
        console.log(iterator, answer);
        console.log("===================iterator, answer");
        if(iterator.id == question_id){
            if (iterator.correct_answer == answer) {
                marks += quiz.correct_answer_mark
            }else{
                marks = marks - quiz.wrong_answer_mark
            }
            break;
        }
    }

    console.log("current marks :", marks);

    let userQuizObj = await models.user_quiz.update({
        // user_id,
        attempt_question_id: JSON.stringify(attempt_question_id),
        attempt_question_answer: JSON.stringify(attempt_question_answer),
        time,
        marks,
    }, {where:{id:user_quiz.id}, returning: true, plain: true}) // todo : returning not working

    let response = {}
    userQuizObj = await models.user_quiz.findOne({where:{id:user_quiz.id}})
    // console.log(userQuizObj);
    if (userQuizObj.attempt_question_id) {
        let attempt_question = JSON.parse(userQuizObj.attempt_question_id);
        console.log({attempt_question});
        for (const iterator of quiz.questions) {
            if (attempt_question.indexOf(iterator.id) == -1) {
                response.current_question = iterator;
                break;
            }
        }
    }else{
        response.current_question = quiz.questions[0];
    }
    return successResponse(response);
}


module.exports = {
    createQuize,
    getQuizeList,
    startQuiz,
    saveUserQuizAnswer
}