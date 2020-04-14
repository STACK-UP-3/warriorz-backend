export default (sequelize, DataTypes) => {
  const userManagement = sequelize.define('usermanagements', {
    line_manager_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {});
  userManagement.associate = (models)=> {
    userManagement.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  };
  return userManagement;
};