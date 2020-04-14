export default (sequelize, DataTypes) => {
  const photos = sequelize.define(
    'photos',
    {
      url: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {},
  );
  photos.associate = (models) => {
    photos.belongsTo(models.users, { foreignKey: 'ownerId', as: 'user' })
  };
  return photos;
};
