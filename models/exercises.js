const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Exercise model
class Exercise extends Model {}
// create fields/columns for Exercise model
Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
        exercise_name: {
            type: DataTypes.STRING,
            allowNull: false
            },
        exercise_description: {
            type: DataTypes.STRING,
            allowNull: false
            },
        exercise_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
                }
            },
        exercise_equipment: {
            type: DataTypes.STRING,
            allowNull: true
            },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
                }
            }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'exercise'
    }
);
module.exports = Exercise;