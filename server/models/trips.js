
export default (sequelize, DataTypes) => {
  const Trips = sequelize.define('trips', {
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    origin: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    dateOfTravel: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    dateOfReturn:{
      type:DataTypes.STRING,
    },
    travelReason: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    accommodation_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    type:{
      type:DataTypes.STRING,
    },
  }, {});

  Trips.associate =(models)=> {
    Trips.belongsTo(models.users, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return Trips;
};