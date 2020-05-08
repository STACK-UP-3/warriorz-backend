
export default (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    trip_request_id: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    line_manager_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailSent:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    managerEmailSent:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {});

  notifications.associate = (models)=> {
    notifications.belongsTo(models.triprequests, { foreignKey: 'trip_request_id', as:'notificationsTripRequest' });
  };
  return notifications;
};