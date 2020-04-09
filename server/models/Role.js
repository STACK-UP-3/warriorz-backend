// https://sequelize.org/master/manual/model-basics.html
// https://sequelize.org/master/manual/assocs.html
export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      permissions: DataTypes.STRING,
    },
    {
      tableName: 'roles',
    },
  );
  Role.associate = (models) => {
    Role.hasMany(models.users, {
      foreignKey: 'role',
      targetKey: 'id',
      onDelete: 'SET DEFAULT',
      onUpdate: 'CASCADE',
    });
  };
  return Role;
};
