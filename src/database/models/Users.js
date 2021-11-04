module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        user_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        avatar: {
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
        tablename: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = function (models) {
        User.hasMany(models.Order, {// el modelo Order todavía no está creado
            as: "orders",
            foreignKey: 'user_id'
        })
    }

    return User;
};