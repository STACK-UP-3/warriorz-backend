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
    },
    {},
  );
  users.associate = ()=> {};
  return users;
};
