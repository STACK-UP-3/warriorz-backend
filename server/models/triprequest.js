
export default (sequelize, DataTypes) => {
  const Triprequest = sequelize.define('triprequests', {
    trip_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    line_manager_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      type:DataTypes.STRING,
      defaultValue: 'pending',
    },
  }, {});
  Triprequest.associate =(models)=> {
    Triprequest.hasMany(models.trips, { 
      foreignKey: 'id',
      as:'tripRequest',
      sourceKey: 'trip_id', 
      onDelete: 'CASCADE',
    });
    Triprequest.belongsTo(models.users, { 
      foreignKey: 'user_id',
      as:'user',
      targetKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' ,
    });

    Triprequest.hasMany(models.notifications, { 
      foreignKey: 'trip_request_id',
      as:'notificationsTripRequest',
      targetKey: 'id', 
      onDelete: 'CASCADE',
    });
  };
  return Triprequest;
};
