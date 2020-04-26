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
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );
  photos.associate = (models) => {
    photos.belongsTo(models.users, { foreignKey: 'ownerId', as: 'user' })
    photos.belongsTo(models.accommodations, { foreignKey: 'ownerId', as: 'accommodation' })
    photos.belongsTo(models.rooms, { foreignKey: 'ownerId', as: 'room' })
  };
  return photos;
};
