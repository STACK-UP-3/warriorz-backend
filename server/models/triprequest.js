
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
    Triprequest.hasMany(models.trips, { foreignKey: 'trip_id', targetKey: 'id' });
  };
  return Triprequest;
};
