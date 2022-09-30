const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const categoryRoutes = require('./CategoryRoutes');
const exerciseRoutes = require('./ExerciseRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;