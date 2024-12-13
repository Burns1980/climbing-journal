const mongoose = require('mongoose');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const ydsGradeRE = /5\.(?:[0-7]|[8-9](\+|-)?|1[0-5][abcd+-]?)$/;
const boulderGradeRE = /^V(?:[0-9]|1[0-7])(?:\+|-)?$/;
const mixedGradeRE = /^M(?:[1-9]|1[0-6])$/;
const iceGradeRE = /^WI[1-7]{1}$/;
const aidRE = /(?:A|C)[0-5]/;

const routeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The route name is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    dateClimbed: {
      type: String,
      validate: {
        validator: function (value) {
          if (value === '') {
            return true;
          }
          return dayjs(value, 'YYYY-MM-DD', true).isValid();
        },
        message: (props) => `${props.value} is an invalid date`,
      },
    },
    type: {
      type: String,
      required: [true, 'The type of climb is required'],
      trim: true,
      lowercase: true,
      enum: ['', 'traditional', 'boulder', 'sport', 'ice', 'mixed', 'aid'],
      message: '{VALUE} not a valid climb type',
    },
    grade: {
      type: String,
      trim: true,
      required: [true, 'The difficulty grade is required.'],
      validate: {
        validator: function (value) {
          switch (this.get('type')) {
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
      upperCase: true,
      enum: [
        '',
        'A0',
        'A1',
        'A2',
        'A3',
        'A4',
        'A5',
        'C1',
        'C2',
        'C3',
        'C4',
        'C5',
      ],
      message: '{VALUE} not a valid aid rating',
      validate: {
        validator: function (value) {
          return this.get('type') === 'aid' && !aidRE.test(value)
            ? false
            : true;
        },
        message: () => 'When Climb type is "aid" Aid rating is required',
      },
    },
    seriousnessRating: {
      type: String,
      trim: true,
      uppercase: true,
      enum: ['', 'G', 'PG', 'PG-13', 'R', 'X'],
      message: '{VALUE} not supported',
    },
    routeLength: {
      type: String,
      trim: true,
    },
    pitches: {
      type: Number,
      trim: true,
      min: [0, 'Cannot have a negative number'],
    },
    commitmentGrade: {
      type: String,
      trim: true,
      uppercase: true,
      enum: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
      message: '{VALUE} is not a valid commitment grade',
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
    // createdDate: {
    //   type: Date,
    //   default: Date.now(),
    // },
    imageCoverUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Route = mongoose.model('Routes', routeSchema);

module.exports = Route;
