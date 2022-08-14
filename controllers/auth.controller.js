const passport = require('passport')
const bcrypt = require('bcrypt');
const User = require('../models/User.model.js');

const signIn = [
	passport.authenticate('local', { failureRedirect: '/' }),
	(_, response) => response.redirect('/')
]

function signUp(request, response, done) {
	const { username, password } = request.body;
	return User.findOne({ username }).then(async user => {
		if (user) return response.redirect('/')
		user = await new User({ username, password: await bcrypt.hash(password, 10) }).save()
		request.login(user, err => {
			if (err) return done(err)
			return response.redirect('/')
		})
	}).catch(done)
}

function logout(request, response, done) {
	request.logout(err => {
		if (err) return done(err)
		return response.redirect('/')
	})
}

module.exports = { signIn, signUp, logout }