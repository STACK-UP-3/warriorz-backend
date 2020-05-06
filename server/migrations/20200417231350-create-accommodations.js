export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('accommodations', {
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
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'available',
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    availableRooms: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable('accommodations');
}
