module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        deleted_at: {
            type: dataTypes.DATE,
        }
    };
    let config = {
        tablename: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Order = sequelize.define(alias, cols, config); 

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as: "orders",
            foreignKey: 'user_id'
        })

        Order.belongsToMany(models.Product, {
            as: "products",
            through: 'order_detail',
            foreignKey: 'order_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }

    return Order;
};