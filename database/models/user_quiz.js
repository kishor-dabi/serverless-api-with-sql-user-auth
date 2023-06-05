
module.exports = (sequelize, DataTypes) => {
    const UserQuiz = sequelize.define(
      'user_quiz',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        
        attempt_question_id: {
          type: DataTypes.STRING
        },
        attempt_question_answer: {
          type: DataTypes.STRING
        },
        time: {
            type: DataTypes.INTEGER,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        marks: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
          allowNull: true,
          type: DataTypes.DATE
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: true,
          type: DataTypes.DATE
        },

      },
      {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      },
    );
  
    UserQuiz.associate = function (models) {
      UserQuiz.belongsTo(models.quiz, { foreignKey: 'id', as: 'quiz' });
      UserQuiz.belongsTo(models.users, { foreignKey: 'id', as: 'user' });
    }
  
    return UserQuiz;
  };
  
  