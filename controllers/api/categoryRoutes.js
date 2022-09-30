const router = require('express').Router();
const { Category, Exercise } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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