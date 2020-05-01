export default (sequelize, DataTypes) => {
  const bookings = sequelize.define(
    'bookings',
    {
      accommodation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {},
  );
  bookings.associate = (models) => {
    bookings.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
    bookings.belongsTo(models.rooms, {
      foreignKey: 'room_id',
      as: 'booking',
    });
  };
  return bookings;
};
