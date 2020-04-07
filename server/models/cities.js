
export default (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    city: DataTypes.STRING,
  }, {});
  cities.associate = ()=> {
  };
  return cities;
};