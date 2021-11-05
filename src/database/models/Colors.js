module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        tablename: 'colors',
        timestamps: false,
    }
    const Color = sequelize.define(alias, cols, config); 

    Color.associate = function (models) {
        Color.hasMany(models.Product, {
            as: "products",
            foreignKey: 'color_id'
        })
    }

    return Color;
};