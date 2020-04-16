export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    country: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.DATE,
    },
    preferredLanguage: {
      type: Sequelize.STRING,
    },
    preferredCurrency: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    lineManagerId: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    appNotification: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    emailNotification: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable('users');
}
