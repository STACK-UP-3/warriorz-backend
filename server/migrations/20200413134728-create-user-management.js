
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('usermanagements', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    line_manager_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
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
  return queryInterface.dropTable('usermanagements');
}