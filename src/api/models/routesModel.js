const mongoose = require('mongoose');

const ydsGradeRE = /5\.(?:[0-7]|[8-9](\+|-)?|1[0-5][abcd\+-]?)$/;

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The route needs a name property'],
    trim: true,
  },
  dateClimbed: {
    type: Date,
    default: Date.now(),
  },
  grade: {
    type: String,
    trim: true,
    lowercase: true,
    match: ydsGradeRE,
    required: [true, 'The grade is required.'],
  },
  type: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ['traditional', 'boulder', 'sport', 'ice', 'mixed', 'aid'],
  },
  length: {
    type: String,
    trim: true,
  },
  pitches: {
    type: Number,
    trim: true,
  },
  commitmentGrade: {
    type: String,
    trim: true,
    uppercase: true,
    enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
  },
  description: {
    type: String,
    trim: true,
  },
  gear: {
    type: String,
    trim: true,
  },
  meta: {
    favorites: Number, // Number of times this route has been favorited
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  imageCoverUrl: {
    type: String,
  },
});

const Route = mongoose.model('Routes', routeSchema);

module.exports = Route;
