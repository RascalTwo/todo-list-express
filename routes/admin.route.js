const router = require('express').Router();
const { admin } = require('../controllers/admin.controller.js');
const { isAdmin } = require('../middlewares/admin.middleware.js');

router.get('/admin', isAdmin, admin)

module.exports = router;