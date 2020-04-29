export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    trip_request_id: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    auxiliary_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    content:{
      type:Sequelize.STRING,
      allowNull:false,
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

export function  down(queryInterface) {
    return queryInterface.dropTable('comments');
}
