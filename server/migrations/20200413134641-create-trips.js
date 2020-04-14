
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    origin: {
      type:Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type:Sequelize.STRING,
      allowNull: false,
    },
    dateOfTravel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfReturn:{
      type:Sequelize.STRING,
    },
    travelReason: {
      type:Sequelize.STRING,
      allowNull: false,
    },
    accommodation_id:{
      type:Sequelize.INTEGER,
    }, 
    type:{
      type:Sequelize.STRING,
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
  return queryInterface.dropTable('trips');
}