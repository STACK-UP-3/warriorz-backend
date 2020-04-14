
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('cities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    city: {
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
  return queryInterface.dropTable('cities');
}