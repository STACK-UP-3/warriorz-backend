export default (sequelize, DataTypes) => {
  const accommodations = sequelize.define(
    'accommodations',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );

  accommodations.associate = (models) => {
    accommodations.hasMany(models.photos, {
      foreignKey: 'ownerId',
      as: 'accommodationPhotos',
      onDelete: 'CASCADE',
      hooks: true,
    });

    accommodations.hasMany(models.services, {
      foreignKey: 'accommodation_id',
      as: 'service',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    accommodations.hasMany(models.rooms, {
      foreignKey: 'accommodation_id',
      as: 'room',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return accommodations;
};
