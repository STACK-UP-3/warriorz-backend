export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('photos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    url: {
      type: Sequelize.STRING,
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  });
}
export function down(queryInterface) {
  return queryInterface.dropTable('photos');
}
