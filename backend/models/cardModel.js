const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    content: {
      type: String,
      required: [true, 'Please add a content value'],
    },
    list: {
      type: String,
      required: [true, 'Please add a list value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', goalSchema);
