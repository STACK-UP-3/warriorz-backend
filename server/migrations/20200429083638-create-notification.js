
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    trip_request_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    line_manager_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    emailSent:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    managerEmailSent:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
  return queryInterface.dropTable('notifications');
}