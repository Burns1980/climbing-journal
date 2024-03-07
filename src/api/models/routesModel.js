const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The route needs a name property'],
    trim: true,
  },
  grade: {
    type: String,
    required: [true, 'The route needs a grade property'],
    trim: true,
    maxLength: 6,
    minLength: 1,
  },
  description: {
    type: String,
    required: [true, 'The route needs a description property'],
    trim: true,
  },
  gear: {
    type: String,
    required: [true, 'The route needs a gear property'],
    trim: true,
  },
  meta: {
    favorites: Number, // Number of times this route has been favorited
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  imageCover: {
    type: String,
    default: 'images/nose-sunset.jpg',
  },
});

const Route = mongoose.model('Routes', routeSchema);

module.exports = Route;
