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
        category: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATETIME,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATETIME,
        },
        deleted_at: {
            type: dataTypes.DATETIME,
        }
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
        Product.belongsToMany(models.Order, {// el modelo Order todavía no está creado
            as: "order",
            through: 'order_detail',
            foreignKey: 'product_id',
            otherKey: 'order_id',
            timestamps: false
        })
    }

    return Product
};