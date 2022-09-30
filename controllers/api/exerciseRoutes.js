const router = require('express').Router();
const { Category, Exercise, User } = require('../../models');
const withAuth = require('../../utils/auth')
// The `/api/exercises` endpoint

router.get('/', withAuth, (req, res) => {
    Exercise.findAll({
        include: [
        {
            model: Category,
            attributes: ['id', 'category_name'],
        },
        ],
    })
        .then((dbExerciseData) => res.json(dbExerciseData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

router.get('/:id', withAuth, (req, res) => {
    Exercise.findOne({
        where: {
        id: req.params.id,
        },
        include: [
        {
            model: Category,
            attributes: ['id', 'category_name', 'category_description'],
        },
        {
            model: User,
            attributes: ['id', 'username'],
        },
        ],
    })
        .then((dbExerciseData) => {
        if (!dbExerciseData) {
            res.status(404).json({ message: 'No exercise found with this id' });
            return;
        }
        res.json(dbExerciseData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

router.post('/', withAuth, (req, res) => {
    Exercise.create({
        exercise_name: req.body.exercise_name,
        exercise_description: req.body.exercise_description,
        exercise_category: req.body.exercise_category,
        exercise_equipment: req.body.exercise_equipment,
        user_id: req.body.user_id,
    })
        .then((dbExerciseData) => res.json(dbExerciseData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

router.put('/:id', withAuth, (req, res) => {
    Exercise.update(
        {
            exercise_name: req.body.exercise_name,
            exercise_description: req.body.exercise_description,
            exercise_category: req.body.exercise_category,
            exercise_equipment: req.body.exercise_equipment,
            user_id: req.body.user_id,
        },
        {
            where: {
            id: req.params.id,
            },
        }
        )
        .then((dbExerciseData) => {
        if (!dbExerciseData) {
            res.status(404).json({ message: 'No exercise found with this id' });
            return;
        }
        res.json(dbExerciseData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

router.delete('/:id', withAuth, (req, res) => {
    Exercise.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((dbExerciseData) => {
        if (!dbExerciseData) {
            res.status(404).json({ message: 'No exercise found with this id' });
            return;
        }
        res.json(dbExerciseData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

module.exports = router;