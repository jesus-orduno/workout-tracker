const User = require('./User');
const Exercise = require('./Exercise');
const Category = require('./Category');
// create associations
User.hasMany(Exercise, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });
Exercise.belongsTo(Category, {
    foreignKey: 'exercise_category',
    onDelete: 'CASCADE'
    });
Exercise.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });
Category.hasMany(Exercise, {
    foreignKey: 'exercise_category',
    onDelete: 'CASCADE'
    });
module.exports = { User, Exercise, Category };