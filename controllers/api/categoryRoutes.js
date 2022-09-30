const router = require('express').Router();
const { Category, Exercise } = require('../../models');
const withAuth = require('../../utils/auth');
// The `/api/categories` endpoint

router.get('/', withAuth, (req, res) => {
  Category.findAll({
    include: [
      {
        model: Exercise,
        attributes: ['id', 'exercise_name', 'exercise_description', 'exercise_category'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Exercise,
        attributes: ['id', 'exercise_name', 'exercise_description', 'exercise_category', 'exercise_equipment', 'user_id'],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Category.create({
    category_name: req.body.category_name,
    category_description: req.body.category_description,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Category.update(
        {
        category_name: req.body.category_name,
        category_description: req.body.category_description,
        },
        {
        where: {
            id: req.params.id,
        },
        }
    )
        .then((dbCategoryData) => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

router.delete('/:id', withAuth, (req, res) => {
    Category.destroy({
        where: {
        id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

module.exports = router;