'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_quiz', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            attempt_question_id: {
                type: Sequelize.STRING
            },
            attempt_question_answer: {
                type: Sequelize.STRING
            },
            time: {
                type: Sequelize.INTEGER
            },
            quiz_id:{
                type: Sequelize.INTEGER,
                references: {
                    model: 'quiz', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            user_id:{
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            is_completed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_quiz');
    }
};