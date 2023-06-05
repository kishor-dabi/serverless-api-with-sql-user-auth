
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    'quiz',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      number_of_questions: {
        type: DataTypes.INTEGER
      },
      wrong_answer_mark: {
        type: DataTypes.DOUBLE
      },
      correct_answer_mark: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      quiz_duration: {
        allowNull: false,
        type: DataTypes.INTEGER
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
      }

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
  Quiz.associate = function (models) {
    Quiz.hasMany(models.questions, { foreignKey: 'quiz_id', as: 'questions' });
  }

  return Quiz;
};

