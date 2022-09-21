const express = require('express');
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require('../controllers/cardsController');

const router = express.Router();

// const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCards).post(createCard);
router.route('/:id').delete(deleteCard).put(updateCard);
// router.route('/').get(protect, getGoals).post(protect, setGoal);
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
