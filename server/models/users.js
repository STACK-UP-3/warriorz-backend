export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      image: {
        type: DataTypes.STRING,
      },
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
        defaultValue: 'user',
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
      token:{
        type: DataTypes.STRING,
      },
    },
    {},
  );
  
  users.associate = (models)=> {
    users.hasMany(models.trips, {
      foreignKey: 'user_id',
      as: 'user',
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
