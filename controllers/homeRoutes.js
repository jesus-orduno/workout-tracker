const router = require('express').Router();
const { User, Exercise, Category } = require('../models');
const withAuth = require('../utils/auth');

// The landing page
router.get('/', withAuth, async (req, res) => {
  try {

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
if (req.session.logged_in) {
  res.redirect('/dashboard');
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
      include: [
        {
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

router.get('/addWorkout', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('addWorkout', {
      ...user,
      logged_in: true,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        username: req.session.username,
      }
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editPassword', withAuth, async (req, res) => {
  try {
    res.render('editPassword', {
      logged_in: true,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/deleteAccount', withAuth, async (req, res) => {
  try {
    res.render('deleteAccount', {
      logged_in: true,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;