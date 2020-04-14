
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('triprequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    trip_id: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    line_manager_id: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    status:{
      type:Sequelize.STRING,
      defaultValue: 'pending',
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
  return queryInterface.dropTable('triprequests');
}