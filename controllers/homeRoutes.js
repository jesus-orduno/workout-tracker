const router = require('express').Router();
const { User, Exercise, Category } = require('../models');
const withAuth = require('../utils/auth');

// The landing page
router.get('/', withAuth, async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    model: Category,
                    attributes: ['category_name'],
                },
            ],
        });

        const exercises = exerciseData.map((exercise) =>
            exercise.get({ plain: true })
        );

        res.render('homepage', {
            exercises,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// The login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// The signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// The dashboard page

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    model: Category,
                    attributes: ['category_name'],
                },
            ],
        });

        const exercises = exerciseData.map((exercise) =>
            exercise.get({ plain: true })
        );

        res.render('dashboard', {
            exercises,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;