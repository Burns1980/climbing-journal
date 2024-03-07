const express = require('express');

const {
  getRoutes,
  createRoute,
  deleteRouteById,
  updateRouteById,
} = require('../controllers/routeController');
const router = express.Router();

router.post('/', (req, res, next) => {
  createRoute(req, res, next);
});

router.get('/', (req, res, next) => {
  getRoutes(req, res, next);
});

router.put('/:id', (req, res, next) => {
  updateRouteById(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  deleteRouteById(req, res, next);
});

module.exports = router;
