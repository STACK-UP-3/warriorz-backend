
export default (sequelize, DataTypes) => {
    const services = sequelize.define('services', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accommodation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});

    services.associate = (models) => {
        services.belongsTo(models.accommodations, { foreignKey: 'accommodation_id', targetKey: 'id' });
    };
    return services;
};