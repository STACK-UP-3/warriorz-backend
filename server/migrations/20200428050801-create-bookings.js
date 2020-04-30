export function up(queryInterface, Sequelize) {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trip_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      checkInDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATEONLY,
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
    return queryInterface.dropTable('bookings');
  }