
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('rooms', {
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
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accommodation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    roomNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    similarRooms: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'available',
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
  return queryInterface.dropTable('rooms');
}