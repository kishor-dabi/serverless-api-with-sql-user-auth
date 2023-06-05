'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'quiz', 
            'quiz_duration', 
            {
                type: Sequelize.INTEGER,
            }
        )
    },
    down: (queryInterface, Sequelize) => {
    }
};