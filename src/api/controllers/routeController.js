const _ = require('lodash');

const Route = require('../models/routesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { removeEmptyElementsFromArr } = require('../../utils/utils');

exports.createRoute = async (req, res, next) => {
  try {
    const reqData = req.body.data;
    let routesToAdd = [];

    // filter out any empty objects
    if (reqData && reqData.length >= 1) {
      routesToAdd = removeEmptyElementsFromArr(reqData);
    }

    if (_.isEmpty(routesToAdd) || routesToAdd.length <= 0) {
      return next(
        new AppError(
          'There were not any new routes in the request body.data property',
          400
        )
      );
    }

    const newRoutesAdded = await Route.insertMany(routesToAdd);

    res.status(201).json({
      status: 'success',
      message: 'Routes were succesfully added',
      newRoutesAdded,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

exports.getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find();

    if (routes.length <= 0) {
      return next(new AppError('There was no route data', 404));
    }

    res.status(200).json({ status: 'success', data: routes });
  } catch (err) {
    next(new AppError(`There was an error querying the database: ${err}`, 404));
  }
};

exports.deleteRoute = async (req, res, next) => {
  try {
    const params = req.params;
    console.log(params);
    res.status(200).json({ status: 'success', message: 'route deleted' });
  } catch (err) {
    next(new AppError(err, 400));
  }
};
