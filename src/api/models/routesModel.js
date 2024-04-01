const mongoose = require('mongoose');

const ydsGradeRE = /5\.(?:[0-7]|[8-9](\+|-)?|1[0-5][abcd\+-]?)$/;
const boulderGradeRE = /^V(?:[0-9]|1[0-7])(?:\+|-)?$/;
const mixedGradeRE = /^M(?:[1-9]|1[0-6])$/;
const iceGradeRE = /^WI[1-7]{1}$/;
const aidRE = /(?:A|C)[0-5]/;

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The route name is missing'],
    trim: true,
  },
  dateClimbed: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    required: [true, 'The type of climb is missing'],
    trim: true,
    lowercase: true,
    enum: ['', 'traditional', 'boulder', 'sport', 'ice', 'mixed', 'aid'],
    validate: {
      validator: function (value) {
        if (value === 'aid') {
          return aidRE.test(this.aidRating);
        }
        return true;
      },
      message: (props) =>
        `${props.value} climb type needs to have an aid rating`,
    },
  },
  grade: {
    type: String,
    trim: true,
    required: [true, 'The difficulty grade is required.'],
    validate: {
      validator: function (value) {
        switch (this.type) {
          case 'aid':
          case 'traditional':
          case 'sport':
            return ydsGradeRE.test(value);
          case 'ice':
            return iceGradeRE.test(value);
          case 'mixed':
            return mixedGradeRE.test(value);
          case 'boulder':
            return boulderGradeRE.test(value);
          default:
            return false; // No grade validation for unknown types
        }
      },
      message: (props) =>
        `${props.value} is not a valid grade for the climb type selected`,
    },
  },
  aidRating: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        if (this.type === 'aid') {
          return aidRE.test(value);
        }
        return false;
      },
      message: (props) => `The aid rating ${props.value} is invalid`,
    },
  },
  seriousnessRating: {
    type: String,
    trim: true,
    uppercase: true,
    enum: ['G', 'PG', 'PG-13', 'R', 'X'],
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
    favorites: Number,
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
