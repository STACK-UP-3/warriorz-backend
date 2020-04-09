export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Requester',
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      googleId: {
        type: DataTypes.INTEGER,
      },
      facebookId: {
        type: DataTypes.INTEGER,
      },
      country: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      gender: { type: DataTypes.STRING, allowNull: true },
      birthdate: { type: DataTypes.DATE, allowNull: true },
      preferredLanguage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'English',
      },
      preferredCurrency: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      department: { type: DataTypes.STRING, allowNull: true },
      lineManagerId: { type: DataTypes.STRING, allowNull: true },
      appNotification: { type: DataTypes.BOOLEAN, defaultValue: true },
      emailNotification: { type: DataTypes.BOOLEAN, defaultValue: true },
      token: {
        type: DataTypes.TEXT,
      },
    },
    {},
  );

  users.associate = (models) => {
    users.hasOne(models.photos, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'CASCADE',
      hooks: true,
    });

    users.hasMany(models.trips, {
      foreignKey: 'user_id',
      as: 'userTrip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    users.hasOne(models.usermanagements, {
      foreignKey: 'user_id',
      as: 'userManagement',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return users;
};
