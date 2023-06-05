'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'questions', // name of Source model
            'quiz_id', // name of the key we're adding 
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'quiz', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        )
    },
    down: (queryInterface, Sequelize) => {
    }
};