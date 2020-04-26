
export default (sequelize, DataTypes) => {
    const rooms = sequelize.define('rooms', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        similarRooms: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        roomNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accommodation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    rooms.associate = (models) => {
        rooms.belongsTo(models.accommodations, { foreignKey: 'accommodation_id', targetKey: 'id' });
    };
    return rooms;
};