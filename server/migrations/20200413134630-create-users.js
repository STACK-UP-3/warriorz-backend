export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user',
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: Sequelize.INTEGER,
    },
    facebookId: {
      type: Sequelize.INTEGER,
    },
    token:{
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable('users');
}
