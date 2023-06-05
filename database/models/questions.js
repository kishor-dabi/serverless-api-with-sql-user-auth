
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    'questions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      question: {
        type: DataTypes.STRING
      },
      options: {
        type: DataTypes.JSON
      },
      correct_answer: {
        type: DataTypes.STRING
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
      quiz_id: {
        type: DataTypes.INTEGER,
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

  Questions.associate = function (models) {
    Questions.belongsTo(models.quiz, { foreignKey: 'id', as: 'quiz' });
  }

  return Questions;
};

