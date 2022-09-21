const asyncHandler = require('express-async-handler');

const Card = require('../models/cardModel');

const createCard = asyncHandler(async (req, res) => {
  const { title, content, list } = req.body;
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error('Please add a text field');
  // }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  const card = await Card.create({
    title,
    content,
    list,
  });

  res.status(200).json(card);
});

const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find();

  res.status(200).json(cards);
});

const updateCard = asyncHandler(async (req, res) => {
  const { title, content, list } = req.body;
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(400);
    throw new Error('Card not found');
  }

  // // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // // Make sure the logged in user matches the goal user
  // if (goal.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  const payload = {
    title,
    content,
    list,
  };
  console.log('payload :', payload);

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, payload, {
    new: true,
  });
  console.log('updatedCard :', updatedCard);

  res.status(200).json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(400);
    throw new Error('Card not found');
  }

  // // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // // Make sure the logged in user matches the goal user
  // if (card.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await card.remove();

  res.status(204).send();
});

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
