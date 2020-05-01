export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    trip_request_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auxiliary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.users, { foreignKey: 'author_id' });
    Comment.belongsTo(models. triprequests, { foreignKey: 'trip_request_id' });
  };
  return Comment;
};