const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

const areaRouter = require('./routes/areas');
const tripResearchRouter = require('./routes/trip-research');
const routeRouter = require('./routes/routes');
const tripReportRouter = require('./routes/trip-reports');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

if (process.env.NODE_ENV === 'development') {
  // helps with the HTTP log viewing during development
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
  });
  app.use(express.static(`${__dirname}/public`));
}

app.use('/api/v1/areas', areaRouter);
app.use('/api/v1/trip-research', tripResearchRouter);
app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/trip-reports', tripReportRouter);
// app.use(defaultRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl}`, 500));
});

app.use(globalErrorHandler);

module.exports = app;
