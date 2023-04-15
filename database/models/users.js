
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
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

  return Users;
};

