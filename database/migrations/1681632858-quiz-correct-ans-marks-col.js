'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'quiz', 
            'correct_answer_mark', 
            {
                type: Sequelize.DOUBLE,
            }
        )
    },
    down: (queryInterface, Sequelize) => {
    }
};