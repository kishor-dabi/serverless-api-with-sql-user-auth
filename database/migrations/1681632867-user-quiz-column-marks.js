'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'user_quiz', 
            'marks', 
            {
                type: Sequelize.DOUBLE,
            }
        )
    },
    down: (queryInterface, Sequelize) => {
    }
};