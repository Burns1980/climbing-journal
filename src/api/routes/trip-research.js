const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Trip research route' });
});

// Add more endpoints as needed...

module.exports = router;
