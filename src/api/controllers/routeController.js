const _ = require('lodash');

const Route = require('../models/routesModel');
const AppError = require('../utils/appError');
const { removeEmptyElementsFromArr } = require('../../utils/utils');

/**
 * Creates new routes based on the provided data in the request body.
 * Filters out any empty objects from the request data before adding them.
 * Responds with success or forwards an error to the error handling middleware.
 *
 * @param {import('express').Request} req - The Express request object, expected to contain route data in `req.body.data`.
 * @param {import('express').Response} res - The Express response object used to send back a success status and message.
 * @param {import('express').NextFunction} next - The next middleware function in the Express stack, used for error handling.
 */
exports;
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

/**
 * Retrieves all routes from the database and responds with them, or an error if no routes exist.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object used to send back the retrieved routes.
 * @param {import('express').NextFunction} next - The next middleware function in the Express stack, used for error handling.
 */
exports.getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find();

    if (routes.length <= 0) {
      return next(new AppError('There was no route data', 404));
    }

    res
      .status(200)
      .json({ status: 'success', count: routes.length, data: routes });
  } catch (err) {
    next(new AppError(`There was an error querying the database: ${err}`, 404));
  }
};

/**
 * Deletes a route based on the provided ID or IDs in the request parameters.
 * Responds with a success message or forwards an error to the error handling middleware.
 *
 * @param {import('express').Request} req - The Express request object, expected to have an `id` or `ids` in `req.params`.
 * @param {import('express').Response} res - The Express response object used to send back a success status and message.
 * @param {import('express').NextFunction} next - The next middleware function in the Express stack, used for error handling.
 */
exports.deleteRoute = async (req, res, next) => {
  try {
    const ids = req.params.id.split(',');

    const routeDeleted = await Route.deleteMany({
      _id: { $in: ids },
    });

    res
      .status(200)
      .json({ status: 'success', message: 'route(s) deleted', routeDeleted });
  } catch (err) {
    next(new AppError(err, 400));
  }
};
