const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Category model
class Category extends Model {}
// create fields/columns for Category model
Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
            },
        category_description: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 2000]
                },
            allowNull: false
            }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);
module.exports = Category;
