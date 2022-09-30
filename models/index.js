const User = require('./User');
const Exercise = require('./exercises');
const Category = require('./categories');
// create associations
User.hasMany(Exercise, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });
Exercise.belongsTo(Category, {
    foreignKey: 'exercise_category',
    onDelete: 'CASCADE'
    });
Exercise.hasMany(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });
Category.hasMany(Exercise, {
    foreignKey: 'exercise_category',
    onDelete: 'CASCADE'
    });
module.exports = { User, Exercise, Category };