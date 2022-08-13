const router = require('express').Router();
const { homepage } = require('../controllers/index.controller.js');

// Add a custom request handler to the `GET` method of the `/` path
router.get('/', homepage)

module.exports = router;