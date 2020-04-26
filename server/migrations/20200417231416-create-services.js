
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('services', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cost: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accommodation_id: {
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
  return queryInterface.dropTable('services');
}