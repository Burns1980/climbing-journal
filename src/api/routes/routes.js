const express = require('express');

const {
  getRoutes,
  createRoute,
  deleteRoute,
} = require('../controllers/routeController');
const router = express.Router();

router.get('/', (req, res, next) => {
  getRoutes(req, res, next);
});

router.post('/', (req, res, next) => {
  createRoute(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  deleteRoute(req, res, next);
});

module.exports = router;
