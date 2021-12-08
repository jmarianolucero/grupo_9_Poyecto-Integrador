module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER,
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        /*deleted_at: {
            type: dataTypes.DATE,
        }*/
    };
    let config = {
        tablename: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function (models) {
        Product.belongsToMany(models.Order, {
            as: "orders",
            through: 'order_detail',
            foreignKey: 'product_id',
            otherKey: 'order_id',
            timestamps: false
        })
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: 'category_id'
        })
        Product.belongsTo(models.Color, {
            as: "colors",
            foreignKey: 'color_id'
        })
    }

    return Product
};