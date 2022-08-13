
const router = require('express').Router();
const { signIn, signUp, logout } = require('../controllers/auth.controller.js');

router.post('/signIn', [...signIn])

router.post('/signUp', signUp)

router.get('/logout', logout)

module.exports = router;